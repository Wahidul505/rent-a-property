import React from "react";

interface IProps {
  name?: string;
  type: string;
  label: string;
  placeholder: string;
  id?: string;
  onChange?: any;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
}

const Input = ({
  name,
  type,
  label,
  placeholder,
  id,
  onChange,
  required = true,
  disabled = false,
  defaultValue,
}: IProps) => {
  return (
    <div className="mb-3 md:mb-4">
      <label
        htmlFor={id}
        className="text-sm md:text-lg text-secondary block mb-1 md:mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id || ""}
        onChange={onChange}
        className="input text-base md:text-xl input-primary rounded text-accent block w-full"
        placeholder={placeholder}
        required
        disabled={disabled}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Input;
