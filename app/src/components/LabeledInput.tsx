import React, { useState, forwardRef, Ref } from "react";

interface Props {
  label: string;
  type: "text" | "number" | "date";
  defaultValue?: string;
  ref?: Ref<HTMLInputElement>;
}

const LabeledInput: React.FC<Props> = forwardRef(
  ({ type = "text", label, defaultValue = "" }, ref?) => {
    const [value, setValue] = useState(defaultValue);
    return (
      <label className="block">
        {label}
        <input
          className="h-8 border-2 border-black rounded-lg block px-2"
          type={type}
          ref={ref}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </label>
    );
  }
);

export default LabeledInput;
