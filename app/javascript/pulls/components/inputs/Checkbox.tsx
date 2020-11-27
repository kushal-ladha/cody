import React from "react";

function Checkbox({
  label,
  name,
  hint,
  checked,
  handleChange,
}: {
  label: string;
  name: string;
  hint?: string;
  checked: boolean;
  handleChange: (event: React.MouseEvent) => void;
}): JSX.Element {
  return (
    <div className="flex items-center justify-between">
      <span id={`${name}-label`} className="flex flex-grow flex-col">
        <span className="text-sm font-medium text-gray-900">{label}</span>
        {hint != null ? (
          <span className="text-sm leading-normal text-gray-500">{hint}</span>
        ) : null}
      </span>
      <button
        aria-pressed={checked}
        aria-labelledby={`${name}-label`}
        onClick={(event) => {
          event.preventDefault();
          handleChange(event);
        }}
        className={`${
          checked ? "bg-indigo-600" : "bg-gray-200"
        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${
            checked ? "translate-x-5" : "translate-x-0"
          } inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
        ></span>
      </button>
    </div>
  );
}

export default Checkbox;
