import { capitalize } from "./capitalize";

describe("capitalize", () => {
  it("returns an empty string when receives undefined", () => {
    let string = capitalize(undefined);

    expect(string).toEqual("");
  });

  it("returns an empty string when receives an empty string", () => {
    let string = capitalize("");

    expect(string).toEqual("");
  });

  it("returns a Hello when receives a Hello", () => {
    let string = capitalize("Hello");

    expect(string).toEqual("Hello");
  });

  it("returns a 'See you tomorrow' when receives 'see you tomorrow'", () => {
    let string = capitalize("see you tomorrow");

    expect(string).toEqual("See you tomorrow");
  });
});
