import React, { ReactChildren } from "react";

interface Props {
  children: ReactChildren | string;
  clickHandler: (event: React.MouseEvent) => void;
}

const BaseButton: React.FC<Props> = ({ children, clickHandler }) => {
  return (
    <button
      style={{ transition: "background-color 0.3s ease" }}
      className="bg-blue-400 border-2 border-solid border-blue-400 rounded py-1 px-3 hover:bg-white leading-none"
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

export default BaseButton;
