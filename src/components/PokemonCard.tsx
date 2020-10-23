import React, { useState } from "react";
import { Pokemon } from "../features/pokemonSlice";

type Props = Pokemon;

const PokemonCard: React.FC<Props> = ({ name, sprites, types }) => {
  const [spriteState, setSpriteState] = useState<string>(sprites.frontDefault);

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg mx-auto w-full px-4 py-2">
      <div
        className="mx-auto w-full flex items-center justify-center"
        onMouseEnter={() => setSpriteState(sprites.backDefault)}
        onMouseLeave={() => setSpriteState(sprites.frontDefault)}
      >
        <img className="w-40" src={spriteState} alt="Sunset in the mountains" />
      </div>

      <div className="px-6 py-4">
        <h1 className="capitalize font-bold text-xl mb-2">{name}</h1>
        <div className="flex flex-wrap mx-auto justify-center">
          {types.map(({ type }) => (
            <div
              key={type.name}
              className="mr-2 capitalize bg-white tracking-wide text-gray-800 font-bold rounded-lg border-yellow-500 hover:border-yellow-600 hover:bg-yellow-500 hover:text-black shadow-md px-6 inline-flex items-center py-2"
            >
              <p>{type.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
