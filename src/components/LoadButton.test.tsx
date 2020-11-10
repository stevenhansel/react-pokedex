import React from "react";
import { render } from "@testing-library/react";
import LoadButton from "./LoadButton";

it("renders LoadButton successfully", () => {
  const { container, getByText } = render(
    <LoadButton clickHandler={() => {}} />
  );

  expect(getByText("Load More")).toBeTruthy();
  expect(container).toMatchSnapshot();
});
