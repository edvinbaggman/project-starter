import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { getTodo } from '../../../api/todos';
import CustomInput from '../../formik/CustomInput';
import SubmitButton from '../../SubmitButton';
import { DocumentIcon } from '@heroicons/react/24/outline';

interface FormValues {
  id: string;
}

const GetTodoForm = () => {
  const initFormValues = {
    id: '',
  };
  const errorText = 'Field is required';

  const formValidation = Yup.object({
    id: Yup.string().required(errorText),
  });

  const handleGetTodo = async (values: FormValues) => {
    const id = values.id;
    const { status, data, error, errorMsg } = await getTodo(id);
    console.log('Status code: ' + status);
    if (data) {
      console.log(data);
    } else if (error) {
      console.log('Error message: ' + errorMsg);
    }
  };

  return (
    <div className='pt-4 pb-4'>
      <h1 className='text-md font-bold'>Get todo!</h1>
      <Formik
        initialValues={initFormValues}
        validationSchema={formValidation}
        onSubmit={async (values) => {
          await handleGetTodo(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomInput name='id' label='Id' type='text' />
            <SubmitButton
              text='Get todo'
              isSubmitting={isSubmitting}
              startIcon={<DocumentIcon />}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GetTodoForm;
