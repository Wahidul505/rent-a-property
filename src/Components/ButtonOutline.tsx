import React from "react";

const ButtonOutline = ({
  label,
  type = "button",
}: {
  label: string;
  type?: "submit" | "button";
}) => {
  return (
    <button
      type={type}
      className="border border-solid border-[#284b63] hover:bg-[#284b63] cursor-pointer  px-4 h-12 bg-[#ffffff] text-[#284b63] hover:text-[#ffffff] hover:border-[#284b63]  text-lg lg:text-xl transition-colors duration-500 rounded"
    >
      {label}
    </button>
  );
};

export default ButtonOutline;
