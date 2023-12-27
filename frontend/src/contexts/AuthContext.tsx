import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import React, { useState, useEffect } from 'react';
import { auth, secondaryAuth } from '../firebase/firebaseSetup';
import Layout from '../components/Layout';

interface AuthResult {
  user: User | null;
  error: FirebaseError | null;
}

interface RegisterProps {
  email: string;
  password: string;
  displayName: string;
}

interface SigninProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface ResetPasswordProps {
  email: string;
}

interface ContextProps {
  user: User | null;
  getJwt: () => Promise<string>;
  signout: () => Promise<void>;
  signin: (props: SigninProps) => Promise<AuthResult>;
  register: (props: RegisterProps) => Promise<AuthResult>;
  resetPassword: (props: ResetPasswordProps) => Promise<AuthResult>;
}

export const AuthContext = React.createContext<ContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuthState, setLoadingAuthState] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: User | null) => {
      setUser(user);
      setLoadingAuthState(false);
    });

    return unsubscribe;
  }, []);

  const register = async ({ email, password, displayName }: RegisterProps) => {
    let user: User | null = null;
    let error: FirebaseError | null = null;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        email,
        password
      );
      user = userCredential.user;
      await updateProfile(user, { displayName });
    } catch (err) {
      if (err instanceof FirebaseError) {
        error = err;
      } else {
        console.log(err);
      }
    }
    return { user, error };
  };

  const signin = async ({ email, password, rememberMe }: SigninProps) => {
    let user: User | null = null;
    let error: FirebaseError | null = null;

    try {
      const persistance = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;

      await setPersistence(auth, persistance);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      user = userCredentials.user;
      setUser(user);
    } catch (err) {
      if (err instanceof FirebaseError) {
        error = err;
      } else {
        console.log(err);
      }
    }
    return { user, error };
  };

  const signout = async () => {
    await signOut(auth);
  };

  const resetPassword = async ({ email }: ResetPasswordProps) => {
    let error: FirebaseError | null = null;
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      if (err instanceof FirebaseError) {
        error = err;
      } else {
        console.log(err);
      }
    }
    return { user: null, error };
  };

  const getJwt = async () => {
    if (user) {
      try {
        const jwt = await user.getIdToken();
        return jwt;
      } catch (err) {
        console.log(err);
      }
    }
    return '';
  };

  const value = {
    user,
    getJwt,
    signout,
    signin,
    register,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {loadingAuthState ? (
        <Layout>
          <span className='loading loading-dots loading-lg'></span>
        </Layout>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
