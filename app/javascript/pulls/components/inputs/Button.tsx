import React from "react";

type ButtonStyle = "plain" | "primary";

function buttonStyleToCSS(style: ButtonStyle): string {
  switch(style) {
    case "plain":
      return "bg-white hover:bg-gray-50 border-gray-300 text-gray-700";
    case "primary":
      return "bg-indigo-600 hover:bg-indigo-700 border-transparent text-white";
  }
}

function Button({
  label,
  style,
  className,
  onClick
}: {
  label: string,
  style?: ButtonStyle,
  className?: string,
  onClick: (event: React.MouseEvent) => void
}): JSX.Element {
  const styleCSS = buttonStyleToCSS(style || "plain");
  return (
    <button
      className={`${styleCSS} px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${className != null ? className : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;