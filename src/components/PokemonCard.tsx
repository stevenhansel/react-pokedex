import React from "react";
import { Pokemon } from "../features/pokemonSlice";
import { PokemonTypeColors } from "../globals";
import { leftPad } from "../utils/leftPad";

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
        backgroundColor: backgroundColors[0].medium,
      }}
      className="w-full rounded-lg overflow-hidden shadow-lg mx-auto"
    >
      <div
        className="py-32 mx-auto w-full flex items-center justify-center relative"
        style={{
          backgroundColor: backgroundColors[0].medium,
        }}
      >
        <p className="text-6xl font-semibold text-black text-opacity-25 absolute tracking-xl top-1/8 pointer-events-none">
          #{leftPad(id, 3)}
        </p>

        <div
          className="inset-x-auto bottom-0 absolute z-20"
          style={{
            width: 175,
            height: 175,
          }}
        >
          <div
            className="rounded-full absolute z-0 inset-x-auto mx-auto"
            style={{
              width: 130,
              height: 130,
              backgroundColor: backgroundColors[0].light,
              zIndex: -10,
              bottom: 8,
              left: 16,
            }}
          />
          <img src={sprites.frontDefault} alt={name} />
        </div>
      </div>

      <div className="bg-white w-full pt-5 pb-8 text-center">
        <h1 className="capitalize font-semibold text-3xl mb-2">{name}</h1>
        <div className="flex flex-wrap mx-auto justify-center">
          {types.map(({ type }, index) => {
            return (
              <p
                key={`${id}-${type.name}`}
                className={
                  "font-bold uppercase text-sm" +
                  (index !== types.length - 1 ? " mr-6" : "")
                }
                style={{ color: backgroundColors[index].medium }}
              >
                {type.name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
