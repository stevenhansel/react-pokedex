import React from "react";

import BulbasaurImage from "../assets/pokemons/bulbasaur.png";
import CharmanderImage from "../assets/pokemons/charmander.png";
import SquirtleImage from "../assets/pokemons/squirtle.png";
import PokemonIcon from "./PokemonIcon";

const GenerationsButton: React.FC = () => {
  return (
    <button
      className="bg-primaryGray px-4 py-1 rounded-lg text-white hover:border-transparent focus:outline-none transform hover:-translate-y-1 hover:shadow transition-all duration-200 ease-in-out"
      onClick={() => {}}
    >
      <div className="flex justify-between">
        <PokemonIcon src={BulbasaurImage} alt="Bulbasaur" />
        <PokemonIcon src={CharmanderImage} alt="Charmander" />
        <PokemonIcon src={SquirtleImage} alt="Squirtle" />
      </div>
    </button>
  );
};

export default GenerationsButton;
