import { Fragment } from "react";

interface InputFieldInterface {
  value: string;
  setValue: (value: string) => void;
  title: string;
  type?: string;
}
export default function InputField({
  value,
  setValue,
  title,
  type = "text",
}: InputFieldInterface) {
  const id = title.replaceAll(" ", "_");
  return (
    <div className="flex flex-col w-full gap-2">
      <label title="age" id={id} className="text-black ">
        {title}
      </label>
      <input
        id={id}
        value={value}
        type={type}
        onChange={(value) => {
          setValue(value.target.value);
        }}
        className="border border-gray-400 text-black rounded-lg py-2 w-full md:w-3/4 px-2"
      />
    </div>
  );
}
