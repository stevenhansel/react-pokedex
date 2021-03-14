import { useState, useEffect } from "react";

const SCROLL_UP = "up";
const SCROLL_DOWN = "down";

type Directions = "up" | "down";

type Props = {
  direction: Directions;
  thresholdPixels: number;
  off: boolean;
};

const useScrollDirection = (
  { direction, thresholdPixels, off }: Props = {
    direction: "down",
    thresholdPixels: 0,
    off: false,
  }
) => {
  const [scrollDirection, setScrollDirection] = useState(direction);

  const scrollToTop = (): void => setScrollDirection("up");

  const isDown = (): boolean => scrollDirection === "down";

  useEffect(() => {
    let firstScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const currentScrollY = window.pageYOffset;

      if (Math.abs(currentScrollY - firstScrollY) < thresholdPixels) {
        // We haven't exceeded the thresholdPixels
        ticking = false;
        return;
      }

      setScrollDirection(
        currentScrollY < firstScrollY ? SCROLL_DOWN : SCROLL_UP
      );

      firstScrollY = currentScrollY > 0 ? currentScrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    // If `off` is set to true, it always will show the navbar.
    off
      ? setScrollDirection(scrollDirection)
      : window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDirection, thresholdPixels, off]);

  return { isDown, scrollToTop };
};

export default useScrollDirection;
