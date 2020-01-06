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
          ? `bg-blue-200 border-2 border-solid border-blue-200 rounded py-1 px-3 leading-none cursor-not-allowed ${cssClasses}`
          : `bg-blue-400 border-2 border-solid border-blue-400 rounded py-1 px-3 hover:bg-white leading-none ${cssClasses}`
      }
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

export default BaseButton;
