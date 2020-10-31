import React from "react";
import { importImages } from "../globals";

const Navbar = () => {
  return (
    <div className="w-full bg-primary flex items-center justify-center py-2">
      <img
        className="w-10 h-10 transition duration-500 ease-in-out transform hover:rotate-180 cursor-pointer"
        alt="Pokeball"
        src={importImages("pokeball")}
        onClick={() => {}}
      />
    </div>
  );
};
export default Navbar;
