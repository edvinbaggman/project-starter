import BackButton from '../components/BackButton';
import LogTodoForm from '../components/forms/todos/LogTodoForm';
import LogTodosForm from '../components/forms/todos/LogTodosForm';
import CreateTodoForm from '../components/forms/todos/CreateTodoForm';
import UpdateTodoForm from '../components/forms/todos/UpdateTodoForm';
import DeleteTodoForm from '../components/forms/todos/DeleteTodoForm';
import { useState } from 'react';

const Dashboard = () => {
  const [selectedForm, setSelectedForm] = useState('logTodo');

  const renderForm = () => {
    switch (selectedForm) {
      case 'logTodo':
        return <LogTodoForm />;
      case 'logTodos':
        return <LogTodosForm />;
      case 'createTodo':
        return <CreateTodoForm />;
      case 'updateTodo':
        return <UpdateTodoForm />;
      case 'deleteTodo':
        return <DeleteTodoForm />;
      default:
        return null;
    }
  };
  return (
    <div className='w-full max-w-96 min-w-60 p-2'>
      <BackButton backToPath='/'></BackButton>
      <h1 className='text-2xl font-bold'>Dashboard!</h1>
      <h2 className='text-md font-bold'>{'(Outputs to console)'}</h2>
      <div className='flex justify-between mt-4'>
        <button
          className={`btn w-16 ${
            selectedForm === 'logTodo' ? 'bg-gray-400' : 'bg-gray-200'
          }`}
          onClick={() => setSelectedForm('logTodo')}
        >
          Log Todo
        </button>
        <button
          className={`btn w-16 ${
            selectedForm === 'logTodos' ? 'bg-gray-400' : 'bg-gray-200'
          }`}
          onClick={() => setSelectedForm('logTodos')}
        >
          Log Todos
        </button>
        <button
          className={`btn w-16 ${
            selectedForm === 'createTodo' ? 'bg-gray-400' : 'bg-gray-200'
          }`}
          onClick={() => setSelectedForm('createTodo')}
        >
          Create Todo
        </button>
        <button
          className={`btn w-16 ${
            selectedForm === 'updateTodo' ? 'bg-gray-400' : 'bg-gray-200'
          }`}
          onClick={() => setSelectedForm('updateTodo')}
        >
          Update Todo
        </button>
        <button
          className={`btn w-16 ${
            selectedForm === 'deleteTodo' ? 'bg-gray-400' : 'bg-gray-200'
          }`}
          onClick={() => setSelectedForm('deleteTodo')}
        >
          Delete Todo
        </button>
      </div>
      <div className='h-96'>{renderForm()}</div>
    </div>
  );
};

export default Dashboard;
