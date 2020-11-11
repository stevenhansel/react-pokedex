import { camelcaseObject } from "./camelcaseObject";

describe("camelcaseObject", () => {
  it("returns an empty object when received an empty object", () => {
    let object = camelcaseObject({});

    expect(object).toEqual({});
  });

  it("returns a camelcase object when the object has a snake case attribute name", () => {
    let object = camelcaseObject({ first_name: "Jonh" });

    expect(object).toEqual({ firstName: "Jonh" });
  });

  it("returns a camelcase object array when receive an array with a snake case object", () => {
    let array = camelcaseObject([
      { first_name: "Jonh" },
      { firstName: "Peter" },
      { "first-name": "Jaz" },
    ]);

    expect(array).toEqual([
      { firstName: "Jonh" },
      { firstName: "Peter" },
      { firstName: "Jaz" },
    ]);
  });
});
