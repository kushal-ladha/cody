import React from "react";

function Container({
  children,
}: {
  children: React.ReactElement | (() => React.ReactElement);
}): JSX.Element {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
      {typeof children === "function" ? children() : children}
    </div>
  );
}

export default Container;
