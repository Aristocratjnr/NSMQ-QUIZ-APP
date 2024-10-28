import React from 'react';

// RadioGroup Component
interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string; // Added className prop
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ value, onValueChange, children, className }) => {
  return (
    <div className={`flex flex-col ${className}`}> {/* Apply className here */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            checked: child.props.value === value,
            onChange: onValueChange,
          });
        }
        return child;
      })}
    </div>
  );
};

// RadioGroupItem Component
interface RadioGroupItemProps {
  value: string;
  id: string;
  checked?: boolean; // Optional prop for checked state
  onChange: (value: string) => void;
  className?: string; // Added className prop
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ value, id, checked, onChange, className }) => {
  return (
    <div className={`flex items-center ${className}`}> {/* Apply className here */}
      <input
        type="radio"
        value={value}
        id={id}
        checked={checked} // Use the checked prop
        onChange={() => onChange(value)} // Calls onChange when selected
        className="form-radio text-blue-600 h-4 w-4"
      />
      <label htmlFor={id} className="ml-2">{value}</label>
    </div>
  );
};