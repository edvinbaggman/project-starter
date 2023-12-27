import { useField } from 'formik';

interface CheckboxInputProps {
  label: string;
  name: string;
  className?: string;
}

const CustomCheckbox = ({
  label,
  name,
  className = '',
}: CheckboxInputProps) => {
  const [field, meta] = useField({
    name,
  });
  return (
    <div className={`form-control w-fit ${className}`}>
      <label className='label pl-0'>
        <input
          type='checkbox'
          checked={field.value}
          className={`checkbox ${
            meta.touched && meta.error && 'border-red-500'
          } `}
          {...field}
        />
        <span className='label-text font-bold ml-2'>{label}</span>
        <span className='label-text-alt text-red-500 italic font-bold ml-2'>
          {meta.touched && meta.error && meta.error}
        </span>
      </label>
    </div>
  );
};

export default CustomCheckbox;
