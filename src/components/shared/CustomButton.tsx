import clsx from "clsx";
import { ReactNode } from "react";

interface CustomButtonProps {
  textName: ReactNode;
  handleAnything?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  textName,
  handleAnything,
  className = "",
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      onClick={handleAnything}
      type={type}
      disabled={disabled}
      className={clsx(
        "relative inline-flex items-center justify-center px-6 py-3 font-semibold rounded-md text-white transition duration-300 ease-in-out",
        "bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500",
        "hover:from-indigo-600 hover:via-blue-600 hover:to-cyan-600",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
    >
      {textName}
    </button>
  );
};

export default CustomButton;
