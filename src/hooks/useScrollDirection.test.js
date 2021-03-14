import { renderHook, act } from "@testing-library/react-hooks";
import useScrollDirection from "./useScrollDirection";

describe("useScrollDirection", () => {
  it("returns isDown as true with default values", () => {
    const { result } = renderHook(() => useScrollDirection());

    expect(result.current.isDown()).toBe(true);
  });

  it("returns isDown as false when scrollToTop", () => {
    const { result } = renderHook(() => useScrollDirection());

    expect(result.current.isDown()).toBe(true);

    act(() => {
      result.current.scrollToTop();
    });

    expect(result.current.isDown()).toBe(false);
  });

  it("returns isDown as false when initialize direction as 'up'", () => {
    const { result } = renderHook(() =>
      useScrollDirection({ direction: "up" })
    );

    expect(result.current.isDown()).toBe(false);
  });
});
