import React from "react";

import { useSelector } from "react-redux";
import { SliceStatus } from "../globals";
import { AiFillGithub } from "react-icons/ai";
import {
  pokemonsSelector,
  getPokemons,
  cachedPokemonsSelector,
} from "../features";

import {
  InfiniteScroll,
  Layout,
  PokemonCard,
  PokemonForm,
  PokemonSkeleton,
} from "../components";

const PokemonsPage = () => {
  const pokemons = useSelector(pokemonsSelector);
  const cachedPokemons = useSelector(cachedPokemonsSelector);

  return (
    <Layout title="Home">
      <div className="flex items-center justify-center lg:justify-start">
        <h1 className="inline-block text-3xl font-semibold lg:text-5xl sm:text-left">
          React Pokédex
        </h1>
        <a
          href="https://github.com/ShinteiMai/react-pokedex"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block ml-4 transform hover:opacity-50 hover:-translate-y-1 transition-all duration-150"
        >
          <AiFillGithub size={32} />
        </a>
      </div>

      <InfiniteScroll
        data={pokemons.data}
        paginationHandler={(page: number) =>
          getPokemons({
            page,
            cachedPokemons: cachedPokemons.data,
            pokemons: pokemons.data,
          })
        }
        isLoading={pokemons.status.state === SliceStatus.LOADING}
      >
        {({ mutatePage }) => (
          <>
            <div className="w-full my-4 md:my-6 lg:my-8">
              <PokemonForm
                placeholder="Search for a pokémon..."
                mutatePage={mutatePage}
              />
            </div>
            <div className="w-full mx-auto text-center">
              {!(
                cachedPokemons.status.state === SliceStatus.LOADING ||
                cachedPokemons.status.state === SliceStatus.IDLE
              ) && (
                <>
                  <InfiniteScroll.Container>
                    {pokemons.data.map((pokemon, index) =>
                      pokemon === null ? (
                        <PokemonSkeleton key={`loading-${index}`} />
                      ) : (
                        <PokemonCard key={pokemon.id} {...pokemon} />
                      )
                    )}
                  </InfiniteScroll.Container>
                  <InfiniteScroll.Waypoint />
                </>
              )}
            </div>
          </>
        )}
      </InfiniteScroll>
    </Layout>
  );
};
export default PokemonsPage;
