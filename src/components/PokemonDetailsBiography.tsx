import React from "react";
import { Pokemon } from "../features/pokemonSlice";
import { Species } from "../features/speciesSlice";
import { importImages } from "../globals";
import { leftPad } from "../utils/leftPad";

type Props = {
  pokemon: Pokemon;
  species: Species;
};

const PokemonDetailsBiography = ({ pokemon, species }: Props) => {
  const inches = (pokemon.height * 3.93701).toFixed(0);
  const feet = Math.floor(Number(inches) / 12);
  console.log(species);
  const genderPercentage =
    species.genderRate !== -1 ? (species.genderRate / 8) * 100 : -1;

  return (
    <>
      <div>
        <h2 className="font-semibold text-lg">Pokémon Data</h2>
        <p className="mt-4 opacity-75">
          {
            species.flavorTextEntries.find(
              (text) => text.language.name === "en"
            )?.flavorText
          }
        </p>
        <ul className="mt-5">
          <li className="grid grid-cols-2 gap-x-1 mb-3">
            <span className="opacity-75">Species</span>
            <span>
              {species.genera.find((gen) => gen.language.name === "en")?.genus}
            </span>
          </li>
          <li className="grid grid-cols-2 gap-x-1 mb-3">
            <span className="opacity-75">Height</span>
            <span>
              {feet}'{leftPad(Number(inches) % 12, 2)}" ({pokemon.height / 10}m)
            </span>
          </li>
          <li className="grid grid-cols-2 gap-x-1 mb-3">
            <span className="opacity-75">Weight</span>
            <span>{(pokemon.weight / 10).toFixed(1)} kg</span>
          </li>
          <li className="grid grid-cols-2 gap-x-1 mb-3">
            <span className="opacity-75">Abilities</span>
            <ol>
              {pokemon.abilities.map((ability, index) => (
                <li
                  key={`ability=${ability.ability.name}`}
                  className="capitalize"
                >
                  {index + 1}. {ability.ability.name}{" "}
                  {ability.isHidden && "(Hidden Ability)"}
                </li>
              ))}
            </ol>
          </li>
          <li className="grid grid-cols-2 gap-x-2 mb-3">
            <span className="opacity-75">Gender</span>
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
          </li>
        </ul>
      </div>
      <div className="my-8">
        <h2 className="font-semibold text-lg">Training</h2>
        <ul className="mt-5">
          <li className="grid grid-cols-2 gap-x-1 mb-3">
            <span className="opacity-75">Base Exp</span>
            <span>{pokemon.baseExperience || 0}</span>
          </li>
          <li className="grid grid-cols-2 gap-x-1 mb-3">
            <span className="opacity-75">Base Happiness</span>
            <span>{species.baseHappiness || 0}</span>
          </li>
          <li className="grid grid-cols-2 gap-x-1 mb-3">
            <span className="opacity-75">Catch Rate</span>
            <span>{((species.captureRate / 255) * 100).toFixed(1)}%</span>
          </li>
          <li className="grid grid-cols-2 gap-x-1 mb-3">
            <span className="opacity-75">Growth Rate</span>
            <span className="capitalize">{species.growthRate.name}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PokemonDetailsBiography;
