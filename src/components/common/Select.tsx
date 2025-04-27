import React, { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  fullWidth?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  fullWidth = true,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label 
          htmlFor={props.id} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <select
        className={`
          px-3 py-2 bg-white border shadow-sm border-gray-300 
          focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 
          disabled:bg-gray-50 disabled:text-gray-500 
          rounded-md w-full ${error ? 'border-red-500' : ''} ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Select;