import React, { useState } from "react";

import Modal from "./Modal";
import PokemonGenerationCard from "./PokemonGenerationCard";
import PokemonIcon from "./PokemonIcon";

import { importPokemonImage } from "../globals";

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

const PokemonGenerations = () => {
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(
    null
  );

  return (
    <Modal>
      <Modal.Button className="bg-primaryGray px-4 py-1 rounded-lg text-white hover:border-transparent focus:outline-none transform hover:-translate-y-1 hover:shadow transition-all duration-200 ease-in-out">
        <div className="flex justify-between">
          <PokemonIcon src={importPokemonImage("bulbasaur")} alt="Bulbasaur" />
          <PokemonIcon
            src={importPokemonImage("charmander")}
            alt="Charmander"
          />
          <PokemonIcon src={importPokemonImage("squirtle")} alt="Squirtle" />
        </div>
      </Modal.Button>
      <Modal.Content title="Pokémon Generations">
        <div className="mx-auto py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-5 gap-y-6">
          {generations.map((images, index) => (
            <PokemonGenerationCard
              key={`generations-${index}`}
              images={images}
              generation={index + 1}
              isSelected={
                selectedGeneration === index && selectedGeneration !== null
              }
              handleClick={() =>
                setSelectedGeneration((previousIndex) =>
                  previousIndex === index ? null : index
                )
              }
            />
          ))}
        </div>
      </Modal.Content>
    </Modal>
  );
};
export default PokemonGenerations;
