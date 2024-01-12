import BackButton from '../components/BackButton';
import GetTodoForm from '../components/forms/todos/GetTodoForm';
import GetTodosForm from '../components/forms/todos/GetTodosForm';
import CreateTodoForm from '../components/forms/todos/CreateTodoForm';
import UpdateTodoForm from '../components/forms/todos/UpdateTodoForm';
import DeleteTodoForm from '../components/forms/todos/DeleteTodoForm';
import { useState } from 'react';

const Dashboard = () => {
  const [selectedForm, setSelectedForm] = useState('getTodo');

  const renderForm = () => {
    switch (selectedForm) {
      case 'getTodo':
        return <GetTodoForm />;
      case 'getTodos':
        return <GetTodosForm />;
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
            selectedForm === 'getTodo' ? 'bg-gray-400' : 'bg-gray-200'
          }`}
          onClick={() => setSelectedForm('getTodo')}
        >
          Get Todo
        </button>
        <button
          className={`btn w-16 ${
            selectedForm === 'getTodos' ? 'bg-gray-400' : 'bg-gray-200'
          }`}
          onClick={() => setSelectedForm('getTodos')}
        >
          Get Todos
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
