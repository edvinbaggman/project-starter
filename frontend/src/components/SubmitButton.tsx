import { cloneElement } from 'react';

interface Props {
  isSubmitting: boolean;
  text: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

const SubmitButton = ({ isSubmitting, text, startIcon, endIcon }: Props) => {
  return (
    <button disabled={isSubmitting} type='submit' className='btn w-full'>
      {isSubmitting ? (
        <span className='loading loading-dots'></span>
      ) : (
        <>
          {startIcon && (
            <>
              {cloneElement(startIcon, {
                className: 'h-5',
              })}
            </>
          )}
          {text}
          {endIcon && (
            <>
              {cloneElement(endIcon, {
                className: 'h-5',
              })}
            </>
          )}
        </>
      )}
    </button>
  );
};

export default SubmitButton;
