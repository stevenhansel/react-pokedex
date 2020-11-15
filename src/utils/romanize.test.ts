import { romanize } from "./romanize";

describe("romanize", () => {
  test.each([
    [0, ""],
    [1, "I"],
    [5, "V"],
    [10, "X"],
    [15, "XV"],
    [100, "C"],
    [500, "D"],
    [900, "CM"],
  ])("returns %b when receives %a", (a, b) => {
    let numeral = romanize(a);

    expect(numeral).toEqual(b);
  });
});
