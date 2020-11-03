import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App Container", () => {
  it("should be able to render the app container without errors", () => {
    const container = render(<App />);
    expect(container.getByTestId("app")).toBeInTheDocument();
  });
});
