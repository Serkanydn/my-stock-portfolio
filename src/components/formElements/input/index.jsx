import React from "react";
import { useField } from "formik";

function Input({ onChange, title, value, type = "text", disabled, containerClass, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { error, touched } = meta;

  return (
    <div className={` px-3  max-sm:w-full mb-6  ${containerClass} `}>
      <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase ">{title}</label>
      <input
        {...props}
        disabled={disabled}
        type={type}
        value={value}
        onChange={onChange}
        className={`appearance-none block w-full  text-gray-700 border border-gray - 200 rounded py-3 px-4 leading-tight focus: outline-none focus:bg-white focus:border-gray-500 ${disabled ? "bg-red-100" : "bg-gray-200"
          } `}
      />
      {!!error && <p className="text-xs italic text-red-500">{error}</p>}
    </div>
  );
}

export default Input;
