import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("hides the navbar when clicking the pokeball image", () => {
    const { container } = render(<Navbar />);
    const div = container.querySelector("div");

    expect(div).toHaveClass("translate-y-0");

    userEvent.click(screen.getByRole("img"));

    expect(div).not.toHaveClass("translate-y-0");
    expect(div).toHaveClass("-translate-y-16");
  });

  it("shows a pokeball image", () => {
    render(<Navbar />);

    const img = screen.getByAltText("Pokeball");

    expect(img.getAttribute("src")).toContain("pokeball");
  });
});
