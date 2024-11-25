import React from "react";

interface IProps {
  children?: React.ReactElement | React.ReactNode;
  name?: string;
  id?: string;
  label: string;
  onChange?: any;
  required?: boolean;
}

const SelectInput = ({
  children,
  name,
  label,
  id,
  onChange,
  required = true,
}: IProps) => {
  return (
    <div className="mb-3 md:mb-4">
      <label
        htmlFor={id}
        className="text-sm md:text-lg text-secondary block mb-1 md:mb-2"
      >
        {label}
      </label>
      <select
        name={name}
        id={id || ""}
        onChange={onChange}
        className="select select-primary text-base md:text-xl font-normal rounded text-accent block w-full"
        required
      >
        {children}
      </select>
    </div>
  );
};

export default SelectInput;
