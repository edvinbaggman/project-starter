import { useEffect, useState } from 'react';
import { XMarkIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  text: string;
  style?: 'success' | 'warning' | 'info' | 'error' | 'normal';
}

const Alert = ({ text, style = 'normal' }: Props) => {
  const [open, setOpen] = useState<boolean>(true);

  //When text changes, open alert again.
  useEffect(() => {
    setOpen(true);
  }, [text]);

  //Don’t use props to build class names dynamically https://tailwindcss.com/docs/content-configuration#class-detection-in-depth
  const styleVariants = {
    warning: {
      btn: 'btn-warning',
      bg: 'bg-warning',
    },
    success: {
      btn: 'btn-success',
      bg: 'bg-success',
    },
    error: {
      btn: 'btn-error',
      bg: 'bg-error',
    },
    info: {
      btn: 'btn-info',
      bg: 'bg-info',
    },
    normal: {
      btn: 'btn-base-200',
      bg: 'bg-base-200',
    },
  };

  return (
    <div
      className={`h-7 mt-2 mb-2 transition-opacity duration-300 ${
        text && open ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {text && open && (
        <div
          className={`flex flex-row justify-between ${styleVariants[style].bg} rounded-xl p-1`}
        >
          <ExclamationCircleIcon className='h-6' />
          <span className='text-center'>{text}</span>
          <button
            onClick={() => setOpen(false)}
            className={`btn btn-xs btn-circle shadow-none ${styleVariants[style].btn}`}
          >
            <XMarkIcon className='h-4' />
          </button>
        </div>
      )}
    </div>
  );
};

export default Alert;
