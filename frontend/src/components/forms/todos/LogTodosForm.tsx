import { Formik, Form } from 'formik';
import { getTodos } from '../../../api/todos';
import SubmitButton from '../../SubmitButton';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

const LogTodosForm = () => {
  const handleLogTodos = async () => {
    const { status, data, error, errorMsg } = await getTodos();
    console.log('Status code: ' + status);
    if (data) {
      console.log(data);
    } else if (error) {
      console.log('Error message: ' + errorMsg);
    }
  };

  return (
    <div className='pt-4 pb-4'>
      <h1 className='text-md font-bold'>Log todos!</h1>
      <Formik
        initialValues={{}}
        onSubmit={async () => {
          await handleLogTodos();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className='mt-4'></div>
            <SubmitButton
              text='Log todos'
              isSubmitting={isSubmitting}
              startIcon={<DocumentDuplicateIcon />}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LogTodosForm;
