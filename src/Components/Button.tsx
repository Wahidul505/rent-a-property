import React from "react";

const Button = ({
  label,
  type = "button",
  onClick,
}: {
  label: string;
  type?: "submit" | "button";
  onClick?: () => void;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className=" bg-[#284b63] cursor-pointer  px-4 h-12 hover:bg-[#3A6A6E] text-[#ffffff]  text-lg lg:text-xl transition-colors duration-500 rounded"
    >
      {label}
    </button>
  );
};

export default Button;
