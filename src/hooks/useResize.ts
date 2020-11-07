import { useEffect, useState, MutableRefObject, useCallback } from "react";

export const useResize = (myRef: MutableRefObject<HTMLElement | null>) => {
  const getDimensions = useCallback(
    () =>
      myRef.current
        ? {
            width: myRef.current.offsetWidth,
            height: myRef.current.offsetHeight,
            top: myRef.current.offsetTop,
            left: myRef.current.offsetLeft,
          }
        : {
            width: 0,
            height: 0,
            top: 0,
            left: 0,
          },
    [myRef]
  );

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef, getDimensions]);

  return dimensions;
};
