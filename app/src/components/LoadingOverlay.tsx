import React from "react";

interface Props {
  active: boolean;
}

const LoadingOverlay: React.FC<Props> = ({ children, active }) => {
  return (
    <div className="relative">
      {children}
      {active ? (
        <div
          style={{ backgroundColor: "#00000033", backdropFilter: "blur(1px)" }}
          className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-2xl font-semibold"
        >
          Loading...
        </div>
      ) : null}
    </div>
  );
};

export default LoadingOverlay;
