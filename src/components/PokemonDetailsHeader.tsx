import React from "react";
import ProgressiveImage from "react-progressive-image-loading";
import { Pokemon } from "../features/pokemonSlice";
import { Species } from "../features/speciesSlice";
import { PokemonTypePlaceholders } from "../globals";
import { leftPad } from "../utils/leftPad";

const MaskStyling = {
  width: 225,
  height: 225,
  bottom: 60,
};

const PokemonImageStyling = {
  width: 325,
  height: 325,
  display: "block",
  left: 0,
  right: 0,
  bottom: 5,
  margin: "auto",
};

type Props = {
  pokemon: Pokemon;
  species: Species;
  selectedBackgroundColor: { light: string; medium: string };
};

const PokemonDetailsHeader = ({
  pokemon,
  species,
  selectedBackgroundColor,
}: Props) => {
  const kanjiName = species.names.find(
    (name) => name.language.name === "ja-Hrkt"
  );
  const imagePlaceholder = pokemon.types.map(({ type }) => {
    const [[, image]] = Object.entries(PokemonTypePlaceholders).filter(
      ([key, _]) => key === type.name
    );

    return image;
  });

  return (
    <>
      <div className="w-full">
        <div className="px-4 md:px-8">
          <p className="text-md mt-4 text-white font-medium">
            #{leftPad(pokemon.id, 3)}
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold pb-6 capitalize">
            {pokemon.name}
          </h1>
        </div>

        <div className="relative text-center mx-auto w-full h-96">
          <h1 className="absolute -mt-2 text-6xl z-0 w-full text-white opacity-50 font-extrabold overflow-hidden">
            {kanjiName && kanjiName.name}
          </h1>

          <div
            className="rounded-full absolute inset-x-auto mx-auto z-0 inline-block left-0 right-0"
            style={{
              ...MaskStyling,
              backgroundColor: selectedBackgroundColor.light,
            }}
          />
          <ProgressiveImage
            preview={imagePlaceholder[0]}
            src={pokemon.sprites.frontDefault}
            render={(src, style) => (
              <img
                src={src}
                alt={pokemon.name}
                style={{
                  ...style,
                  ...PokemonImageStyling,
                  position: "absolute",
                }}
              />
            )}
          />
        </div>
      </div>
      <div className="-mt-12" />
    </>
  );
};

export default PokemonDetailsHeader;
