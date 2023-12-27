import { useField } from 'formik';
import { ReactElement, cloneElement } from 'react';

interface TextInputProps {
  label: string;
  name: string;
  type: string;
  icon?: ReactElement;
  className?: string;
}

const CustomInput = ({
  label,
  name,
  type,
  className,
  icon,
}: TextInputProps) => {
  const [field, meta] = useField({
    name,
    type,
  });

  return (
    <label className={`w-full ${className}`} htmlFor={name}>
      <div className='label'>
        <span className='label-text font-bold'>{label}</span>
        <span className='label-text-alt text-red-500 italic font-bold'>
          {meta.touched && meta.error && meta.error}
        </span>
      </div>
      <div className='relative'>
        <input
          type={type}
          className={`input input-bordered w-full pr-10 focus:outline-none focus:border-black
          ${meta.touched && meta.error && 'border-red-500 '} 
          ${icon && 'pl-10 '}`}
          {...field}
        />
        {icon && (
          <div className='absolute top-3.5 start-3 pointer-events-none'>
            {cloneElement(icon, {
              className: 'h-5',
            })}
          </div>
        )}
      </div>
      <div className='label'></div>
    </label>
  );
};

export default CustomInput;
