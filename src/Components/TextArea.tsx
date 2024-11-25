import React from "react";

interface IProps {
  name?: string;
  label: string;
  placeholder: string;
  id?: string;
  onChange?: any;
  required?: boolean;
}

const TextArea = ({
  name,
  label,
  placeholder,
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
      <textarea
        name={name}
        id={id || ""}
        onChange={onChange}
        className="textarea text-base md:text-xl textarea-primary rounded text-accent block w-full"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default TextArea;
