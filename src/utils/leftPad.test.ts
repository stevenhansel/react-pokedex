import { leftPad } from "./leftPad";

describe("leftPad", () => {
  it("returns '001' when receives '1, -3'", () => {
    let output = leftPad(1, -3);

    expect(output).toEqual("001");
  });

  it("returns '001' when receives '-1, 3'", () => {
    let output = leftPad(-1, 3);

    expect(output).toEqual("001");
  });

  it("returns '0' when receives '0, 1'", () => {
    let output = leftPad(0, 1);

    expect(output).toEqual("0");
  });

  it("returns '00' when receives '0, 2'", () => {
    let output = leftPad(0, 2);

    expect(output).toEqual("00");
  });

  it("adds four 0's to the left when receives a 5 as length", () => {
    let output = leftPad(1, 5);

    expect(output).toEqual("00001");
  });
});
