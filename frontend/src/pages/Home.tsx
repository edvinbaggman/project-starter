import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';

const Home = () => {
  const navigate = useNavigate();
  const { user, signout } = useAuth();

  return (
    <div className='w-full max-w-96 min-w-60 p-2'>
      <h1 className='text-2xl font-bold'>Welcome to Project Starter!</h1>
      <h1 className='text-xl font-bold'>{`User: ${
        user ? user.displayName : 'None'
      }`}</h1>

      <button
        disabled={!!user}
        className='btn w-full mt-4'
        onClick={() => navigate('/signin')}
      >
        <ArrowRightEndOnRectangleIcon className='h-5' />
        Sign in
      </button>
      <button disabled={!user} className='btn w-full mt-4' onClick={signout}>
        <ArrowRightStartOnRectangleIcon className='h-5' />
        Sign out
      </button>
    </div>
  );
};

export default Home;
