import React, { forwardRef, Ref } from "react";

interface Props {
  label: string;
  type: "text" | "number" | "date";
  ref?: Ref<HTMLInputElement>;
}

const LabeledInput: React.FC<Props> = forwardRef(
  ({ type = "text", label }, ref?) => {
    return (
      <label className="block">
        {label}
        <input
          className="h-8 border-2 border-black rounded-lg block px-2"
          type={type}
          ref={ref}
        />
      </label>
    );
  }
);

export default LabeledInput;
