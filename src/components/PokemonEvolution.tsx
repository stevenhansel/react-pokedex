import React from "react";
import ProgressiveImage from "react-progressive-image-loading";
import { Pokemon } from "../features/pokemonSlice";
import { PokemonTypePlaceholders } from "../globals";
import { leftPad } from "../utils/leftPad";

import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";
import { ChainLink } from "../features/evolutionChainSlice";
import { useHistory } from "react-router-dom";

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
  chain: ChainLink | undefined;
  selectedBackgroundColor: { light: string; medium: string };
};

const PokemonEvolution = ({
  pokemon,
  chain,
  selectedBackgroundColor,
}: Props) => {
  const history = useHistory();
  const imagePlaceholder = pokemon.types.map(({ type }) => {
    const [[, image]] = Object.entries(PokemonTypePlaceholders).filter(
      ([key, _]) => key === type.name
    );

    return image;
  });
  const minLevel = chain?.evolutionDetails[0]?.minLevel;

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
            onClick={() => history.push(`/pokemons/${pokemon.id}`)}
            className="cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
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
          {minLevel && `Level ${minLevel}`}
        </p>
      </div>
      <p className="flex items-center mx-auto mt-2 mb-4 lg:mb-0 lg:mt-0">
        {chain?.evolvesTo.length !== 0 && (
          <>
            <AiOutlineCaretDown
              className="block mx-auto lg:hidden opacity-75"
              size={24}
            />
            <AiOutlineCaretRight
              className="hidden mx-auto lg:block opacity-75"
              size={24}
            />
          </>
        )}
      </p>
    </div>
  );
};

export default PokemonEvolution;
