import React from "react";
import { useSelector } from "react-redux";
import { getPokemons, pokemonsSelector } from "../features/pokemonSlice";
import { SliceStatus } from "../globals";
import InfiniteScroll from "./InfiniteScroll";
import PokemonCard from "./PokemonCard";

const PokemonList: React.FC = () => {
  const pokemons = useSelector(pokemonsSelector);

  return (
    <InfiniteScroll
      paginationHandler={getPokemons}
      isLoading={pokemons.status.state === SliceStatus.LOADING}
    >
      {pokemons.data.map((pokemon, index) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </InfiniteScroll>
  );
};
export default PokemonList;
