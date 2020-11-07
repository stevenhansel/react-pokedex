import React from "react";
import ProgressiveImage from "react-progressive-image-loading";
import { Pokemon } from "../features/pokemonSlice";
import { PokemonTypePlaceholders } from "../globals";
import { leftPad } from "../utils/leftPad";

import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";

const MaskSize = 200;
const ImageSize = 150;

const MaskStyling = {
  width: MaskSize,
  height: MaskSize,
  bottom: 0,
};
const ImageContainerStyling = {
  width: ImageSize,
  height: ImageSize,
  display: "block",
  left: 0,
  right: 0,
  bottom: 25,
  margin: "auto",
};

type Props = {
  pokemon: Pokemon;
  selectedBackgroundColor: { light: string; medium: string };
};

const PokemonEvolution = ({ pokemon, selectedBackgroundColor }: Props) => {
  const imagePlaceholder = pokemon.types.map(({ type }) => {
    const [[, image]] = Object.entries(PokemonTypePlaceholders).filter(
      ([key, _]) => key === type.name
    );

    return image;
  });

  return (
    <div className="mb-5 lg:mb-0 lg:flex lg:flex-row w-full">
      <div className="text-center mx-auto flex-1">
        <div className="relative mx-auto h-48 w-full">
          <div
            style={{
              ...MaskStyling,
              backgroundColor: selectedBackgroundColor.light,
            }}
            className="rounded-full absolute inset-x-auto mx-auto z-0 inline-block left-0 right-0"
          />
          <div
            style={{
              ...ImageContainerStyling,
              position: "absolute",
            }}
          >
            <ProgressiveImage
              preview={imagePlaceholder[0]}
              src={pokemon.sprites.frontDefault}
              render={(src, style) => (
                <img src={src} style={style} alt={pokemon.name} />
              )}
            />
          </div>
        </div>
        <p className="mt-1 text-sm text-black font-semibold">
          #{leftPad(pokemon.id, 3)}
        </p>
        <h1 className="capitalize font-semibold text-xl">{pokemon.name}</h1>
        <p className="text-black text-sm font-semibold text-opacity-75">
          Level 16
        </p>
      </div>
      <p className="flex items-center mx-auto">
        <AiOutlineCaretDown className="block mx-auto lg:hidden" size={24} />
        <AiOutlineCaretRight className="hidden mx-auto lg:block" size={24} />
      </p>
    </div>
  );
};

export default PokemonEvolution;
