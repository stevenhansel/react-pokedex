import React, { FC } from "react";
import { AiFillGithub } from "react-icons/ai";

const PokemonsTitle: FC = () => {
  return (
    <div className="flex items-center justify-center lg:justify-start">
      <h1 className="inline-block text-3xl font-semibold lg:text-5xl sm:text-left">
        React Pokédex
      </h1>
      <a
        href="https://github.com/ShinteiMai/react-pokedex"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block ml-4 transform hover:opacity-50 hover:-translate-y-1 transition-all duration-150"
      >
        <AiFillGithub size={32} />
      </a>
    </div>
  );
};

export default PokemonsTitle;
