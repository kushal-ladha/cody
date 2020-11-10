import React from "react";
import { render } from "@testing-library/react";
import Icon from "../Icon";

test("Icon snapshot test", () => {
  const component = render(<Icon icon="user-circle" />);
  let fragment = component.asFragment();
  expect(fragment).toMatchSnapshot();
});
