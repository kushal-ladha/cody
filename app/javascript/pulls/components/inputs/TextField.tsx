import React, { SyntheticEvent } from "react";
import classnames from "classnames";

const TextField = ({
  label,
  name,
  value,
  readonly,
  handleChange
}: {
  label: string,
  name: string,
  value: string,
  readonly?: boolean,
  handleChange?: (event: SyntheticEvent<HTMLInputElement>) => void
}) => (
  <div className="field">
    <label className="label" htmlFor={name}>
      {label}
    </label>
    <div className="control">
      <input
        className={classnames({
          input: true,
          "is-static": readonly
        })}
        type="text"
        name={name}
        value={value}
        readOnly={readonly}
        onChange={handleChange}
      />
    </div>
  </div>
);

export default TextField;
