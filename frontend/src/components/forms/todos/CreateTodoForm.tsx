import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { createTodo } from '../../../api/todos';
import CustomInput from '../../formik/CustomInput';
import SubmitButton from '../../SubmitButton';
import { useAuth } from '../../../hooks/useAuth';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';

interface FormValues {
  id: string;
  stringField: string;
  numberField: string;
}

const CreateTodoForm = () => {
  const { getJwt } = useAuth();
  const initFormValues = {
    id: '',
    stringField: '',
    numberField: '',
  };
  const errorText = 'Field is required';
  const numberErrorText = 'Must be a number';

  const formValidation = Yup.object({
    id: Yup.string().required(errorText),
    stringField: Yup.string().required(errorText),
    numberField: Yup.number().typeError(numberErrorText).required(errorText),
  });

  const handleCreateTodo = async (values: FormValues) => {
    const id = values.id;
    const jwt = await getJwt();
    const body = {
      stringField: values.stringField,
      numberField: Number(values.numberField),
    };
    const { status, error, errorMsg } = await createTodo(id, body, jwt);
    console.log('Status code: ' + status);
    if (!error) {
      console.log('Todo created');
    } else {
      console.log(errorMsg);
    }
  };

  return (
    <div className='pt-4 pb-4'>
      <h1 className='text-md font-bold'>Create todo!</h1>
      <Formik
        initialValues={initFormValues}
        validationSchema={formValidation}
        onSubmit={async (values) => {
          await handleCreateTodo(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomInput name='id' label='Id' type='text' />
            <CustomInput name='stringField' label='String' type='text' />
            <CustomInput name='numberField' label='Number' type='text' />
            <SubmitButton
              text='Create todo'
              isSubmitting={isSubmitting}
              startIcon={<DocumentPlusIcon />}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateTodoForm;
