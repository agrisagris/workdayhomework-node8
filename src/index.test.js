import ReactDOM from "react-dom";
import React from "react";
import { render } from "@testing-library/react";

test("should render index.js", () => {
  const { container } = render(<div id="root" />);

  const spy = jest.spyOn(ReactDOM, "render");

  require("./index.js");
  expect(spy).toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});
