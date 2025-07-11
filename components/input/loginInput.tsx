import React from "react";
interface InputComponentInterface {
  title: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}

const InputComponent: React.FC<InputComponentInterface> = ({
  title,
  value,
  onChange,
  type,
}) => {
  return (
    <div>
      <label className="font-semibold text-sm text-gray-600 pb-1 block">
        {title}
      </label>
      <input
        type={type}
        value={value}
        onChange={(value) => {
          onChange(value.target.value);
        }}
        required
        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-black"
      />
    </div>
  );
};

export default InputComponent;
