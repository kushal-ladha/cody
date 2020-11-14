import React, { SyntheticEvent } from "react";

function Checkbox({
  label,
  name,
  checked,
  handleChange,
}: {
  label: string;
  name: string;
  checked: boolean;
  handleChange: (event: SyntheticEvent<HTMLInputElement>) => void;
}): JSX.Element {
  return (
    <div className="field">
      <div className="control">
        <label className="checkbox" htmlFor={`checkbox-${name}`}>
          <input
            type="checkbox"
            id={`checkbox-${name}`}
            name={name}
            checked={checked}
            onChange={handleChange}
          />
          &nbsp;&nbsp;
          {label}
        </label>
      </div>
    </div>
  );
}

export default Checkbox;
