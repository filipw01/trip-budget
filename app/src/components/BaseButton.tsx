import React from "react";

interface Props {
  clickHandler: (event: React.MouseEvent) => void;
  disabled?: boolean;
  cssClasses?: string;
}

const BaseButton: React.FC<Props> = ({
  children,
  clickHandler,
  disabled,
  cssClasses = ""
}) => {
  return (
    <button
      type="button"
      style={{ transition: "background-color 0.3s ease" }}
      disabled={disabled}
      className={
        disabled
          ? `bg-gray-600 border-2 border-solid border-black rounded py-1 px-3 leading-none cursor-not-allowed ${cssClasses}`
          : `bg-white text-black border-2 border-solid border-black rounded py-1 px-3 hover:bg-black hover:text-white leading-none ${cssClasses}`
      }
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

export default BaseButton;
