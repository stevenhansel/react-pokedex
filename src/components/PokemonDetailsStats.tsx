import React from "react";
import { Pokemon } from "../features/pokemonSlice";
import PokemonStats from "./PokemonStats";

type Props = {
  pokemon: Pokemon;
};

const transformStatNames = (statName: string) => {
  const map: string[][] = [
    ["special-attack", "Sp. Atk"],
    ["special-defense", "Sp. Def"],
  ];
  let transformed = statName;
  map.forEach(([a, b]) => {
    if (a === statName) {
      transformed = b;
    }
  });

  return transformed;
};

const PokemonDetailsStats = ({ pokemon }: Props) => {
  const stats = pokemon.stats.map((resource) => ({
    name: transformStatNames(resource.stat.name),
    min: resource.baseStat,
    max:
      resource.stat.name === "hp"
        ? Number(resource.baseStat) * 2 + 204
        : (Number(resource.baseStat) * 2 + 99) * 1.1,
  }));

  return (
    <>
      <h1 className="font-semibold text-lg mb-4">Base Stats</h1>
      <ul className="capitalize">
        {stats.map((st) => (
          <PokemonStats
            key={`stats-${st.name}`}
            title={st.name}
            min={st.min}
            max={st.max}
          />
        ))}
        <div className="grid grid-cols-5 gap-2 md:gap-4 lg:gap-8 mt-5">
          <span className="text-darkerGray font-medium">Total</span>
          <span className="text-center font-semibold">
            {stats.reduce((sum, { min }) => sum + min, 0)}
          </span>
          <div className="col-span-2 w-full flex items-center" />
          <span className="text-center text-darkerGray font-medium">Max</span>
        </div>
      </ul>
      <p className="mt-10 mb-6 text-darkerGray font-medium">
        Min & Max values are calculated for level 100 Pokemon. Minimum values
        are based on 0 EVs & 0 IVs, meanwhile Maximum values are based on 252
        EVs & 31 IVs.
      </p>
    </>
  );
};

export default PokemonDetailsStats;
