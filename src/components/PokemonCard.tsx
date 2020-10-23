import React, { useState } from "react";
import { Pokemon } from "../features/pokemonSlice";
import PokemonType from "./PokemonType";

type Props = Pokemon;

const PokemonCard: React.FC<Props> = ({ id, name, sprites, types }) => {
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
        <p className="text-lg">{id}</p>
        <h1 className="capitalize font-bold text-xl mb-2">{name}</h1>
        <div className="flex flex-wrap mx-auto justify-center">
          {types.map(({ type }) => (
            <PokemonType key={`${name}-${type}`} type={type.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
