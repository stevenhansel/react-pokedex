import React from "react";
import { Pokemon } from "../features/pokemonSlice";
import { PokemonTypeColors } from "../globals";
import { leftPad } from "../utils/leftPad";
import PokemonType from "./PokemonType";

type Props = Pokemon;

const PokemonCard: React.FC<Props> = ({ id, name, sprites, types }) => {
  const backgroundColors = types.map(({ type }) => {
    const [[, backgroundColor]] = Object.entries(PokemonTypeColors).filter(
      ([key, _]) => key === type.name
    );

    return backgroundColor;
  });

  return (
    <div
      style={{
        backgroundColor: backgroundColors[0],
      }}
      className="w-full rounded-lg overflow-hidden shadow-lg mx-auto"
    >
      <div className="py-8 mx-auto w-full flex items-center justify-center">
        <img
          style={{
            backgroundColor: backgroundColors[0],
          }}
          className="w-48"
          src={sprites.frontDefault}
          alt={name}
        />
      </div>

      <div className="bg-white w-full pt-4 pb-8">
        <p className="text-lg font-medium">#{leftPad(id, 3)}</p>
        <h1 className="capitalize font-bold text-2xl mb-2">{name}</h1>
        <div className="flex flex-wrap mx-auto justify-center">
          {types.map(({ type }, index) => {
            return (
              <PokemonType
                key={`${name}-${type.name}`}
                type={type.name}
                backgroundColor={backgroundColors[index]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
