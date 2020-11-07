import React from "react";
import { Pokemon } from "../features/pokemonSlice";
import { Species } from "../features/speciesSlice";

import PokemonEvolution from "./PokemonEvolution";

type Props = {
  pokemon: Pokemon;
  species: Species;
  selectedBackgroundColor: { light: string; medium: string };
};

const PokemonDetailsEvolutions = ({
  pokemon,
  species,
  selectedBackgroundColor,
}: Props) => {
  return (
    <div className="mt-12 text-center lg:grid lg:grid-cols-2 lg:gap-y-10">
      <PokemonEvolution
        pokemon={pokemon}
        selectedBackgroundColor={selectedBackgroundColor}
      />

      <PokemonEvolution
        pokemon={pokemon}
        selectedBackgroundColor={selectedBackgroundColor}
      />
      <PokemonEvolution
        pokemon={pokemon}
        selectedBackgroundColor={selectedBackgroundColor}
      />
    </div>
  );
};

export default PokemonDetailsEvolutions;
