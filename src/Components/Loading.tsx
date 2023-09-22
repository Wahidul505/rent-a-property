import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="flex justify-center items-center h-96">
      <div className="rounded-full border-t-2 border-primary animate-spin duration-300 h-24 w-24"></div>
    </div>
  );
};

export default Loading;
