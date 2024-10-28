import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline'; // Added 'outline' variant
}

export const Button: React.FC<ButtonProps> = ({ variant = 'default', className, children, ...props }) => {
  const baseStyles = 'rounded-lg px-4 py-2 font-semibold focus:outline-none transition duration-200';
  const variantStyles = {
    default: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-green-500 text-white hover:bg-green-600',
    outline: 'border border-blue-500 text-blue-500 hover:bg-blue-100', // Outline styles
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};