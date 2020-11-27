import React from "react";

function TextField({
  label,
  hint,
  name,
  type,
  value,
  handleChange,
}: {
  label: string;
  hint?: string;
  name: string;
  value: string;
  type?: string;
  readonly?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type != null ? type : "text"}
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          className="block w-full sm:w-1/2 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm border-gray-200 rounded-md"
        />
      </div>
      {hint != null ? (
        <p className="mt-2 text-sm text-gray-500">{hint}</p>
      ) : null}
    </div>
  );
}

export default TextField;
