import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Reviewer from "../Reviewer";
import "@testing-library/jest-dom/extend-expect";

test("Reviewer snapshot test", () => {
  const props = {
    login: "aergonaut",
    reviewRule: {
      name: "Foo Review"
    }
  };
  const component = renderer.create(<Reviewer reviewer={props} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Reviewer renders the reviewer's login", () => {
  render(<Reviewer reviewer={{ login: "aergonaut" }} />);
  expect(screen.getByTestId("reviewer-login")).toHaveTextContent("aergonaut");
});

test("Reviewer renders the review rule name if it is given", () => {
  const props = {
    login: "aergonaut",
    reviewRule: {
      name: "Foo Review"
    }
  };
  render(<Reviewer reviewer={props} />);
  expect(screen.getByTestId("review-rule-name")).toHaveTextContent(
    props.reviewRule.name
  );
});
