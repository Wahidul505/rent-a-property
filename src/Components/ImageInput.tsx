interface IProps {
  label: string;
  id?: string;
  onChange?: any;
  required?: boolean;
}

const ImageInput = ({ label, id, onChange, required = true }: IProps) => {
  return (
    <div className="mb-3 md:mb-4">
      <label
        htmlFor={id}
        className="text-sm md:text-lg text-secondary block mb-1 md:mb-2"
      >
        {label}
      </label>
      <input
        type="file"
        id={id || ""}
        onChange={onChange}
        className="input-primary border border-solid cursor-pointer p-2 text-base md:text-xl rounded text-accent block file-input file-input-bordered file-input-primary w-full"
        required
      />
    </div>
  );
};

export default ImageInput;
