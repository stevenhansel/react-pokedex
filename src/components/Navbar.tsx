import React, { useEffect, useState } from "react";
import { importImages } from "../globals";
import * as Scroll from "react-scroll";
import useScrollDirection from "../hooks/useScrollDirection";

const scroll = Scroll.animateScroll;

const Navbar = () => {
  const scrollDirection = useScrollDirection({ initialDirection: "down" });
  const [scrolledToTop, setScrolledToTop] = useState<boolean>(true);

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={
        "fixed z-50 w-full bg-primary flex items-center justify-center py-2 transition-all duration-300 transform" +
        " " +
        (scrollDirection === "up" && !scrolledToTop && "translate-y-0") +
        " " +
        (scrollDirection === "down" && !scrolledToTop && "-translate-y-16")
      }
    >
      <img
        className="w-10 h-10 transition duration-500 ease-in-out transform hover:rotate-180 cursor-pointer"
        alt="Pokeball"
        src={importImages("pokeball")}
        onClick={() => scroll.scrollToTop()}
      />
    </div>
  );
};
export default Navbar;
