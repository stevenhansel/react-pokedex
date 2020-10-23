import React from "react";

const PokemonTypeColors = {
  normal: "#C4C4A4",
  fire: "#F08030",
  fighting: "#C03028",
  water: "#6890F0",
  flying: "#A890F0",
  grass: "#78C850",
  poison: "#A040A0",
  electric: "#F8D030",
  ground: "#E0C068",
  psychic: "#F85888",
  rock: "#B8A038",
  ice: "#98D8D8",
  bug: "#A8B820",
  dragon: "#7038F8",
  ghost: "#705898",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

type Props = {
  type: string;
};

const PokemonType: React.FC<Props> = ({ type }) => {
  const [backgroundColor] = Object.entries(PokemonTypeColors).filter(
    ([key, _]) => key === type
  );

  return (
    <div
      style={{
        backgroundColor: backgroundColor[1],
      }}
      className="mr-2 capitalize tracking-wide font-bold rounded-lg shadow-md px-6 inline-flex items-center py-1 text-white"
    >
      <p>{type}</p>
    </div>
  );
};

export default PokemonType;
