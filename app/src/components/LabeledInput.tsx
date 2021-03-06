import React, { useState, forwardRef, Ref, useEffect } from "react";

interface Props {
  label: string;
  type: "text" | "number" | "date";
  defaultValue?: string | number;
  ref?: Ref<HTMLInputElement>;
}

const LabeledInput: React.FC<Props> = forwardRef(
  ({ type = "text", label, defaultValue = "" }, ref?) => {
    const [value, setValue] = useState(defaultValue);
    useEffect(() => {
      setValue(defaultValue);
    }, [defaultValue]);
    return (
      <label className="block">
        {label}
        <input
          className="h-8 border-2 border-black rounded-lg block px-2 text-black"
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
