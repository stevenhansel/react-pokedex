import React, { useCallback } from "react";

import Modal from "./Modal";
import PokemonGenerationCard from "./PokemonGenerationCard";
import PokemonIcon from "./PokemonIcon";

import { importPokemonImage } from "../globals";
import { PokemonGenerationsEnum } from "../features/cachedPokemonsSlice";

const generations = [
  [
    importPokemonImage("bulbasaur"),
    importPokemonImage("charmander"),
    importPokemonImage("squirtle"),
  ],
  [
    importPokemonImage("chikorita"),
    importPokemonImage("cyndaquil"),
    importPokemonImage("totodile"),
  ],
  [
    importPokemonImage("treecko"),
    importPokemonImage("torchic"),
    importPokemonImage("mudkip"),
  ],
  [
    importPokemonImage("turtwig"),
    importPokemonImage("chimcar"),
    importPokemonImage("piplup"),
  ],
  [
    importPokemonImage("snivy"),
    importPokemonImage("tepig"),
    importPokemonImage("oshawott"),
  ],
  [
    importPokemonImage("chespin"),
    importPokemonImage("fennekin"),
    importPokemonImage("froakie"),
  ],
  [
    importPokemonImage("rowlet"),
    importPokemonImage("litten"),
    importPokemonImage("popplio"),
  ],
];

type Props = {
  selectedGeneration: PokemonGenerationsEnum | null;
  setSelectedGeneration: React.Dispatch<
    React.SetStateAction<PokemonGenerationsEnum | null>
  >;
  changeGenerationHandler: () => void;
  isLoading: boolean;
};

const PokemonGenerations = ({
  selectedGeneration,
  setSelectedGeneration,
  changeGenerationHandler,
  isLoading,
}: Props) => {
  const indexToPokemonGenerations = useCallback(
    (realIndex: number): PokemonGenerationsEnum | null => {
      const pokemonGenerations = Object.entries(PokemonGenerationsEnum);
      let selectedEnum: PokemonGenerationsEnum | null = null;

      pokemonGenerations.forEach(([_, b], index) => {
        if (index === realIndex) {
          selectedEnum = b;
        }
      });
      return selectedEnum;
    },
    []
  );

  const pokemonGenerationsToIndex = useCallback(
    (selectedGeneration: PokemonGenerationsEnum): number => {
      const pokemonGenerations = Object.entries(PokemonGenerationsEnum);
      let selectedIndex: number = 0;

      pokemonGenerations.forEach(([_, b], index) => {
        if (b === selectedGeneration) {
          selectedIndex = index;
        }
      });

      return selectedIndex;
    },
    []
  );

  return (
    <Modal>
      <Modal.Button
        disabled={isLoading}
        className={
          "bg-primaryGray px-4 py-1 rounded-lg text-white hover:border-transparent focus:outline-none " +
          " " +
          (isLoading
            ? "opacity-25 cursor-default"
            : "cursor-pointer transform hover:-translate-y-1 hover:shadow transition-all duration-200 ease-in-out")
        }
      >
        <div className="flex justify-between">
          {selectedGeneration !== null ? (
            <>
              {generations[pokemonGenerationsToIndex(selectedGeneration)].map(
                (image, index) => (
                  <PokemonIcon
                    key={`${image}-${index}`}
                    src={image}
                    alt={`Pokemon Icon Image`}
                  />
                )
              )}
            </>
          ) : (
            <>
              <PokemonIcon
                src={importPokemonImage("bulbasaur")}
                alt="Bulbasaur"
              />
              <PokemonIcon
                src={importPokemonImage("charmander")}
                alt="Charmander"
              />
              <PokemonIcon
                src={importPokemonImage("squirtle")}
                alt="Squirtle"
              />
            </>
          )}
        </div>
      </Modal.Button>
      <Modal.Content
        title="Pokémon Generations"
        handleSaveModal={changeGenerationHandler}
      >
        <div className="mx-auto py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-5 gap-y-6">
          {generations.map((images, index) => (
            <PokemonGenerationCard
              key={`generations-${index}`}
              images={images}
              generation={index + 1}
              isSelected={
                selectedGeneration === indexToPokemonGenerations(index) &&
                selectedGeneration !== null
              }
              handleClick={() => {
                setSelectedGeneration((previousGeneration) => {
                  const pickedGeneration = indexToPokemonGenerations(index);
                  return previousGeneration === pickedGeneration
                    ? null
                    : pickedGeneration;
                });
              }}
            />
          ))}
        </div>
      </Modal.Content>
    </Modal>
  );
};
export default PokemonGenerations;
