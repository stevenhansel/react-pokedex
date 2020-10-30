import React from "react";
import PokemonForm from "../components/PokemonForm";

import Layout from "../components/Layout";
import InfiniteScroll from "../components/InfiniteScroll";
import PokemonCard from "../components/PokemonCard";
import { useSelector } from "react-redux";
import { pokemonsSelector, getPokemons } from "../features/pokemonSlice";
import { SliceStatus } from "../globals";

const HomePage = () => {
  const pokemons = useSelector(pokemonsSelector);
  const onSubmit = () => {};

  return (
    <Layout title="Home">
      <div className="px-6 md:px-24 lg:px-64 mt-6 md:mt-10">
        <h1 className="text-3xl lg:text-5xl font-semibold">React Pokédex</h1>
        <div className="my-4 md:my-6 lg:my-8 w-full">
          <PokemonForm
            submitHandler={onSubmit}
            placeholder="Search for a pokémon..."
          />
        </div>

        <div className="mx-auto w-full text-center">
          <InfiniteScroll
            paginationHandler={getPokemons}
            isLoading={pokemons.status.state === SliceStatus.LOADING}
          >
            {({ numCols }) => (
              <>
                {pokemons.data.map((pokemon, index) => (
                  <PokemonCard
                    key={pokemon.id}
                    {...pokemon}
                    position={index % numCols}
                    numCols={numCols}
                  />
                ))}
              </>
            )}
          </InfiniteScroll>
        </div>
      </div>
    </Layout>
  );
};
export default HomePage;
