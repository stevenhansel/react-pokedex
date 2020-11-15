import { randomize } from "./randomize";

beforeEach(() => {
  jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);
});

afterEach(() => {
  jest.spyOn(global.Math, "random").mockReset();
});

describe("randomize", () => {
  it("returns 1 when receives 1 as minimum and 2 as maximum", () => {
    let number = randomize(1, 2);

    expect(number).toEqual(1);
  });

  it("returns 21 when receives 20 as minimum and 30 as maximum", () => {
    let number = randomize(20, 30);

    expect(number).toEqual(21);
  });

  it("returns 31 when receives 30 as minimum and 40 as maximum", () => {
    let number = randomize(30, 40);

    expect(number).toEqual(31);
  });

  it("returns 91 when receives 90 as minimum and 100 as maximum", () => {
    let number = randomize(90, 100);

    expect(number).toEqual(91);
  });
});
