import { useMediaQuery } from "react-responsive";

const useTailwindMediaQuery = () => {
  const isSmall = useMediaQuery({
    query: "(min-device-width: 640px)",
  });
  const isMedium = useMediaQuery({
    query: "(min-device-width: 768px)",
  });
  const isLarge = useMediaQuery({
    query: "(min-device-width: 1024px)",
  });
  const isExtraLarge = useMediaQuery({
    query: "(min-device-width: 1280px)",
  });
  return {
    isSmall,
    isMedium,
    isLarge,
    isExtraLarge,
  };
};

export default useTailwindMediaQuery;
