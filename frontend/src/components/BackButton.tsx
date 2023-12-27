import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

interface Props {
  backToPath: string;
  text?: string;
}

const BackButton = ({ backToPath, text }: Props) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(backToPath)} className='btn btn-xs mb-2'>
      <ChevronLeftIcon className='h-4' />
      <span>{text ? text : 'Back'}</span>
    </button>
  );
};

export default BackButton;
