import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import CustomInput from '../components/formik/CustomInput';
import BackButton from '../components/BackButton';
import { useAuth } from '../hooks/useAuth';
import SubmitButton from '../components/SubmitButton';
import Alert from '../components/Alert';
import {
  ArrowRightEndOnRectangleIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import CustomCheckbox from '../components/formik/CustomCheckbox';
import CustomPasswordInput from '../components/formik/CustomPasswordInput';

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const initFormValues = {
    email: '',
    password: '',
    rememberMe: true,
  };
  const errorText = 'Field is required';

  const formValidation = Yup.object({
    email: Yup.string().required(errorText),
    password: Yup.string().required(errorText),
  });

  const handleSignin = async (values: FormValues) => {
    setError('');

    const email = values.email;
    const password = values.password;
    const rememberMe = values.rememberMe;

    const { error } = await signin({ email, password, rememberMe });

    if (error) {
      const errorCode = error.code;

      if (
        errorCode == 'auth/invalid-email' ||
        errorCode == 'auth/invalid-credential' ||
        errorCode == 'auth/user-not-found' ||
        errorCode == 'auth/wrong-password'
      ) {
        setError('Email or password is incorrect');
      } else {
        console.log(errorCode);
        setError('Unkown error');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className='w-full max-w-96 min-w-60 p-2'>
      <BackButton backToPath='/'></BackButton>
      <h1 className='text-3xl font-bold mb-2'>Sign in!</h1>
      <Formik
        initialValues={initFormValues}
        validationSchema={formValidation}
        onSubmit={async (values) => {
          await handleSignin(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomInput
              name='email'
              label='Email'
              type='text'
              icon={<EnvelopeIcon />}
            />
            <CustomPasswordInput
              name='password'
              label='Password'
              icon={<LockClosedIcon />}
            />
            <CustomCheckbox
              name='rememberMe'
              label='Remember me?'
              className='mb-2'
            />
            <SubmitButton
              text='Sign in'
              isSubmitting={isSubmitting}
              startIcon={<ArrowRightEndOnRectangleIcon />}
            />
          </Form>
        )}
      </Formik>
      <div className='link flex-row w-full flex justify-between mt-2'>
        <Link to={'/register'}>Dont have an account?</Link>
        <Link to={'/resetPassword'}>Forgot Password?</Link>
      </div>
      <Alert text={error} style='warning'></Alert>
    </div>
  );
};

export default Signin;
