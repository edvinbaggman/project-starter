import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { deleteTodo } from '../../../api/todos';
import SubmitButton from '../../SubmitButton';
import { useAuth } from '../../../hooks/useAuth';
import CustomInput from '../../formik/CustomInput';
import { DocumentMinusIcon } from '@heroicons/react/24/outline';

interface FormValues {
  id: string;
}

const initFormValues = {
  id: '',
};
const errorText = 'Field is required';

const formValidation = Yup.object({
  id: Yup.string().required(errorText),
});

const DeleteTodoForm = () => {
  const { getJwt } = useAuth();

  const handleDeleteTodo = async (values: FormValues) => {
    const id = values.id;
    const jwt = await getJwt();
    const { status, error, errorMsg } = await deleteTodo(id, jwt);
    console.log('Status code: ' + status);
    if (!error) {
      console.log('Todo deleted');
    } else {
      console.log(errorMsg);
    }
  };

  return (
    <div className='pt-4 pb-4'>
      <h1 className='text-md font-bold'>Delete todo!</h1>
      <Formik
        initialValues={initFormValues}
        validationSchema={formValidation}
        onSubmit={async (values) => {
          await handleDeleteTodo(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomInput name='id' label='Id' type='text' />
            <SubmitButton
              text='Delete todo'
              isSubmitting={isSubmitting}
              startIcon={<DocumentMinusIcon />}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DeleteTodoForm;
