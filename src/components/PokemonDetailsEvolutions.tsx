import React from "react";
import { useSelector } from "react-redux";
import { ChainLink } from "../features/evolutionChainSlice";
import { pokemonsSelector } from "../features/pokemonSlice";

import PokemonEvolution from "./PokemonEvolution";

type Props = {
  selectedIds: number[];
  chainLinks: ChainLink[];
  selectedBackgroundColor: { light: string; medium: string };
};

const PokemonDetailsEvolutions = ({
  selectedBackgroundColor,
  selectedIds,
  chainLinks,
}: Props) => {
  const pokemons = useSelector(pokemonsSelector);

  return (
    <div className="mt-12 text-center ">
      <div className="lg:grid lg:grid-cols-2 lg:gap-y-10">
        {selectedIds.map((id) => {
          const pokemon = pokemons.data.find((p) => p !== null && id === p.id);
          const chain = chainLinks.find(
            ({ species }) =>
              Number(species.url.split("/").splice(-2)[0]) === pokemon?.id
          );

          return (
            <>
              {pokemon && (
                <PokemonEvolution
                  pokemon={pokemon}
                  chain={chain}
                  selectedBackgroundColor={selectedBackgroundColor}
                />
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonDetailsEvolutions;
