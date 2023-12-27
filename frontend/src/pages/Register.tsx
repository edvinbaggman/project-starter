import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import CustomInput from '../components/formik/CustomInput';
import BackButton from '../components/BackButton';
import { useAuth } from '../hooks/useAuth';
import SubmitButton from '../components/SubmitButton';
import Alert from '../components/Alert';
import {
  UserPlusIcon,
  LockClosedIcon,
  EnvelopeIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import CustomPasswordInput from '../components/formik/CustomPasswordInput';

interface FormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  firstname: string;
  lastname: string;
}

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const initFormValues = {
    email: '',
    password: '',
    passwordConfirm: '',
    firstname: '',
    lastname: '',
  };
  const errorText = 'Field is required';

  const formValidation = Yup.object({
    email: Yup.string().required(errorText),
    password: Yup.string().required(errorText),
    passwordConfirm: Yup.string().required(errorText),
    firstname: Yup.string().required(errorText),
    lastname: Yup.string().required(errorText),
  });

  const handleRegister = async (values: FormValues) => {
    setError('');

    const email = values.email;
    const password = values.password;
    const passwordConfirm = values.passwordConfirm;
    const firstname = values.firstname;
    const lastname = values.lastname;
    const displayName = firstname + ' ' + lastname;

    if (password != passwordConfirm) {
      setError('Passwords do not match');
      return;
    }

    const { error } = await register({ email, password, displayName });

    if (error) {
      const errorCode = error.code;

      if (errorCode == 'auth/email-already-in-use') {
        setError('Email address already exists');
      } else if (errorCode == 'auth/invalid-email') {
        setError('Email address is not valid');
      } else if (errorCode == 'auth/weak-password') {
        setError('Password is not strong enough');
      } else {
        console.log(errorCode);
        setError('Unkown error');
      }
    } else {
      navigate('/signin');
    }
  };

  return (
    <div className='w-full max-w-96 min-w-60 p-2'>
      <BackButton backToPath='/signin'></BackButton>
      <h1 className='text-3xl font-bold mb-2'>Register!</h1>
      <Formik
        initialValues={initFormValues}
        validationSchema={formValidation}
        onSubmit={async (values) => {
          await handleRegister(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomInput
              name='firstname'
              label='First name'
              type='text'
              icon={<UserIcon />}
            />
            <CustomInput
              name='lastname'
              label='Last name'
              type='text'
              icon={<UserIcon />}
            />
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
            <CustomPasswordInput
              name='passwordConfirm'
              label='Confirm Password'
              icon={<LockClosedIcon />}
            />
            <SubmitButton
              text='Register'
              isSubmitting={isSubmitting}
              startIcon={<UserPlusIcon />}
            />
          </Form>
        )}
      </Formik>
      <Alert text={error} style='warning'></Alert>
    </div>
  );
};

export default Register;
