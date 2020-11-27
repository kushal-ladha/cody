import React from "react";

function List({ children }: { children: React.ReactElement | (() => React.ReactElement)}): JSX.Element {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {typeof children === "function" ? children() : children}
      </ul>
    </div>
  );
}

export default List;
