import React, { forwardRef, Ref, useState } from "react";

interface Props {
  text: string;
  ref?: Ref<HTMLInputElement>;
}

const FileInput: React.FC<Props> = forwardRef(({ text }, ref?) => {
  const [filename, setFilename] = useState("");
  const handleNewFile = (e: any) => {
    setFilename(e.target.files[0].name);
  };
  return (
    <label className="block w-48 bg-white text-black p-2 text-center rounded-lg mt-4 border border-blue-800 border-dashed cursor-pointer">
      {filename !== "" ? filename : text}
      <input
        className="mt-4 hidden"
        type="file"
        ref={ref}
        onChange={handleNewFile}
      />
    </label>
  );
});

export default FileInput;
