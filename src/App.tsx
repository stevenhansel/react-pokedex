import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { Waypoint } from "react-waypoint";
import PokemonCard from "./components/PokemonCard";
import { getPokemons, pokemonsSelector } from "./features/pokemonSlice";
import { SliceStatus } from "./globals";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  const pokemons = useSelector(pokemonsSelector);

  useEffect(() => {
    dispatch(getPokemons({ page }));
  }, [dispatch, page]);

  return (
    <div className="text-center mt-24 px-24">
      <h1 className="text-4xl">React Pokedex</h1>
      <p className="text-lg">
        A sophisticated pokedex built with react using the PokeAPI.
      </p>
      <div className="mt-16">
        <div className="mx-auto w-3/4 grid grid-cols-3 gap-3">
          {pokemons.data.map((pokemon, index) => (
            <div key={pokemon.id}>
              <PokemonCard {...pokemon} />
            </div>
          ))}
        </div>
        <div className="py-16">
          {pokemons.status.state === SliceStatus.LOADING ? (
            <div>
              <ScaleLoader />
            </div>
          ) : (
            <div className="mt-24">
              <Waypoint onEnter={() => setPage((p) => p + 1)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
