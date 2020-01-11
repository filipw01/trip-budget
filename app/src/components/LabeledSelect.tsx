import React, { forwardRef, Ref, ChangeEvent } from "react";

interface Props {
  label: string;
  options: Array<{ key: string; name: string }>;
  ref?: Ref<HTMLSelectElement>;
  handleChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const LabeledSelect: React.FC<Props> = forwardRef(
  ({ label, options, handleChange }, ref) => {
    return (
      <label className="block">
        {label}
        <select
          onChange={handleChange}
          className="h-8 border-2 border-black rounded-lg block px-2"
          ref={ref}
        >
          {options.map(option => (
            <option key={option.key} data-id={option.key}>
              {option.name}
            </option>
          ))}
        </select>
      </label>
    );
  }
);

export default LabeledSelect;
