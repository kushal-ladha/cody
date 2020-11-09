import React from "react";

function sizeModifier(size) {
  switch (size) {
    case "small":
    case "medium":
    case "large":
      return `is-${size}`;
    default:
      return "";
  }
}

const Icon = ({
  icon,
  size
}: {
  icon: string,
  size?: "small" | "medium" | "large"
}) => (
  <span className={`icon ${sizeModifier(size)}`}>
    <i className={`fas fa-${icon}`} />
  </span>
);

export default Icon;
