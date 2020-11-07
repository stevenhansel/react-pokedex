import React from "react";
import { Pokemon } from "../features/pokemonSlice";
import { Species } from "../features/speciesSlice";
import { importImages } from "../globals";
import { leftPad } from "../utils/leftPad";
import PokemonInformation from "./PokemonInformation";

type Props = {
  pokemon: Pokemon;
  species: Species;
};

const PokemonDetailsBiography = ({ pokemon, species }: Props) => {
  const inches = (pokemon.height * 3.93701).toFixed(0);
  const feet = Math.floor(Number(inches) / 12);
  const genderPercentage =
    species.genderRate !== -1 ? (species.genderRate / 8) * 100 : -1;

  return (
    <>
      <div>
        <h2 className="font-semibold text-lg">Pokémon Data</h2>
        <p className="mt-4 text-darkerGray">
          {
            species.flavorTextEntries.find(
              (text) => text.language.name === "en"
            )?.flavorText
          }
        </p>
        <ul className="mt-5">
          <PokemonInformation
            title="Species"
            content={
              species.genera.find((gen) => gen.language.name === "en")?.genus
            }
          />
          <PokemonInformation
            title="Height"
            content={`${feet}'${leftPad(Number(inches) % 12, 2)}" (${
              pokemon.height / 10
            }m)`}
          />
          <PokemonInformation
            title="Weight"
            content={`${(pokemon.weight / 10).toFixed(1)} kg`}
          />
          <PokemonInformation
            title="Abilities"
            content={pokemon.abilities.map((ability, index) => (
              <li
                key={`ability=${ability.ability.name}`}
                className="capitalize"
              >
                {index + 1}. {ability.ability.name}{" "}
                {ability.isHidden && "(Hidden Ability)"}
              </li>
            ))}
          />
          <PokemonInformation
            title="Gender"
            content={
              <span className="flex items-end justify-start">
                {genderPercentage === -1 ? (
                  <span>Genderless</span>
                ) : (
                  <>
                    <div className="flex items-center mr-3">
                      <img
                        className="w-4 h-4"
                        src={importImages("male")}
                        alt="male"
                      />
                      <span className="ml-2">{100 - genderPercentage}%</span>
                    </div>
                    <div className="flex items-center">
                      <img
                        className="w-4 h-4"
                        src={importImages("female")}
                        alt="female"
                      />
                      <span className="ml-2">{genderPercentage}%</span>
                    </div>
                  </>
                )}
              </span>
            }
          />
        </ul>
      </div>
      <div className="my-8">
        <h2 className="font-semibold text-lg">Training</h2>
        <ul className="mt-5">
          <PokemonInformation
            title="Base Exp"
            content={pokemon.baseExperience || 0}
          />
          <PokemonInformation
            title="Base Happiness"
            content={species.baseHappiness || 0}
          />
          <PokemonInformation
            title="Catch Rate"
            content={`${((species.captureRate / 255) * 100).toFixed(1)}%`}
          />
          <PokemonInformation
            title="Growth Rate"
            content={
              <span className="capitalize">{species.growthRate.name}</span>
            }
          />
        </ul>
      </div>
    </>
  );
};

export default PokemonDetailsBiography;
