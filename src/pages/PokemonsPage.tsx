import React from "react";

import { useSelector } from "react-redux";
import { SliceStatus } from "../globals";
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
  PokemonsTitle,
} from "../components";

const PokemonsPage = () => {
  const pokemons = useSelector(pokemonsSelector);
  const cachedPokemons = useSelector(cachedPokemonsSelector);

  return (
    <Layout title="Home">
      <PokemonsTitle />

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
