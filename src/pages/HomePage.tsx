import React, { useEffect } from "react";
import PokemonForm from "../components/PokemonForm";

import Layout from "../components/Layout";
import InfiniteScroll from "../components/InfiniteScroll";
import PokemonCard from "../components/PokemonCard";
import { useDispatch, useSelector } from "react-redux";
import { pokemonsSelector, getPokemons } from "../features/pokemonSlice";
import { SliceStatus } from "../globals";
import {
  cachedPokemonsSelector,
  getCachedPokemons,
} from "../features/cachedPokemonsSlice";

const HomePage = () => {
  const pokemons = useSelector(pokemonsSelector);
  const cachedPokemons = useSelector(cachedPokemonsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCachedPokemons());
    // eslint-disable-next-line
  }, []);

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
          {!(cachedPokemons.status.state === SliceStatus.LOADING) && (
            <InfiniteScroll
              paginationHandler={(page: number) =>
                getPokemons({ page, cachedPokemons: cachedPokemons.data })
              }
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
          )}
        </div>
      </div>
    </Layout>
  );
};
export default HomePage;
