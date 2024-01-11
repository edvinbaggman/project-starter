import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { updateTodo } from '../../../api/todos';
import CustomInput from '../../formik/CustomInput';
import SubmitButton from '../../SubmitButton';
import { useAuth } from '../../../hooks/useAuth';
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';

interface FormValues {
  id: string;
  stringField: string;
  numberField: string;
}

const UpdateTodoForm = () => {
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

  const handleUpdateTodo = async (values: FormValues) => {
    const id = values.id;
    const jwt = await getJwt();
    const body = {
      stringField: values.stringField,
      numberField: Number(values.numberField),
    };
    const { status, error, errorMsg } = await updateTodo(id, body, jwt);
    console.log('Status code: ' + status);
    if (!error) {
      console.log('Todo Updated');
    } else {
      console.log(errorMsg);
    }
  };

  return (
    <div className='pt-4 pb-4'>
      <h1 className='text-md font-bold'>Update todo!</h1>
      <Formik
        initialValues={initFormValues}
        validationSchema={formValidation}
        onSubmit={async (values) => {
          await handleUpdateTodo(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomInput name='id' label='Id' type='text' />
            <CustomInput name='stringField' label='String' type='text' />
            <CustomInput name='numberField' label='Number' type='text' />
            <SubmitButton
              text='Update todo'
              isSubmitting={isSubmitting}
              startIcon={<DocumentArrowUpIcon />}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateTodoForm;
