import React, { FC } from "react";
import { importImages } from "../globals";
import useScrollDirection from "../hooks/useScrollDirection";

const Navbar: FC = () => {
  const { isDown, scrollToTop } = useScrollDirection();

  const handleToggleNavbar = (): string =>
    isDown() ? "translate-y-0" : "-translate-y-16";

  return (
    <div
      className={`fixed z-50 w-full bg-primary flex items-center justify-center py-2
          transition-all duration-300 transform ${handleToggleNavbar()}`}
    >
      <img
        className="w-10 h-10 cursor-pointer transition duration-500 ease-in-out transform hover:rotate-180"
        alt="Pokeball"
        src={importImages("pokeball")}
        onClick={() => scrollToTop()}
      />
    </div>
  );
};

export default Navbar;
