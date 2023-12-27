import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import CustomInput from './CustomInput';

interface PasswordInputProps {
  label: string;
  name: string;
  icon?: JSX.Element;
  className?: string;
}

const CustomPasswordInput = ({
  label,
  name,
  className,
  icon,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const type = showPassword ? 'text' : 'password';

  return (
    <div className='relative'>
      <CustomInput
        name={name}
        label={label}
        type={type}
        className={className}
        icon={icon}
      />
      <button
        type='button'
        onClick={() => setShowPassword(!showPassword)}
        className='absolute bottom-7 end-3'
      >
        {showPassword ? (
          <EyeSlashIcon className='h-5' />
        ) : (
          <EyeIcon className='h-5' />
        )}
      </button>
    </div>
  );
};

export default CustomPasswordInput;
