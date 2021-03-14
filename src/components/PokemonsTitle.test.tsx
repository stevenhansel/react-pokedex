import React from "react";
import { render, screen } from "@testing-library/react";
import PokemonsTitle from "./PokemonsTitle";

let component = <PokemonsTitle />;

describe("PokemonsPageTitle", () => {
  it("has a title page", () => {
    render(component);
    expect(screen.getByText("React Pokédex")).toBeTruthy();
  });

  it("has a github link", () => {
    const { container } = render(component);
    const a = container.querySelector("a");

    expect(a?.getAttribute("target")).toEqual("_blank");
    expect(a?.getAttribute("rel")).toEqual("noopener noreferrer");
    expect(a?.getAttribute("href")).toEqual(
      "https://github.com/ShinteiMai/react-pokedex"
    );
  });
});
