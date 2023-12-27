import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import CustomInput from '../components/formik/CustomInput';
import BackButton from '../components/BackButton';
import { useAuth } from '../hooks/useAuth';
import SubmitButton from '../components/SubmitButton';
import Alert from '../components/Alert';
import { InboxArrowDownIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface FormValues {
  email: string;
}

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const initFormValues = {
    email: '',
  };
  const errorText = 'Field is required';

  const formValidation = Yup.object({
    email: Yup.string().required(errorText),
  });

  const handleRequest = async (values: FormValues) => {
    setSuccess('');
    setError('');

    const email = values.email;

    const { error } = await resetPassword({ email });

    if (error) {
      const errorCode = error.code;

      if (
        errorCode == 'auth/invalid-email' ||
        errorCode == 'auth/user-not-found'
      ) {
        setError('The email you entered is incorrect');
      } else {
        console.log(errorCode);
        setError('Unkown error');
      }
    } else {
      setSuccess('Follow the instructions in the email');
    }
  };

  return (
    <div className='w-full max-w-96 min-w-60 p-2'>
      <BackButton backToPath='/signin'></BackButton>
      <h1 className='text-3xl font-bold mb-2'>Forgotten password?</h1>
      <Formik
        initialValues={initFormValues}
        validationSchema={formValidation}
        onSubmit={async (values) => {
          await handleRequest(values);
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
            <SubmitButton
              text='Reset password'
              isSubmitting={isSubmitting}
              startIcon={<InboxArrowDownIcon />}
            />
          </Form>
        )}
      </Formik>
      <Alert
        text={success ? success : error}
        style={success ? 'success' : 'warning'}
      ></Alert>
    </div>
  );
};

export default ResetPassword;
