import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "./components/PokemonCard";
import Skeleton from "./components/Skeleton";
import { getPokemons, pokemonsSelector } from "./features/pokemonSlice";
import { SliceStatus } from "./globals";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector(pokemonsSelector);

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  return (
    <div className="text-center mt-24 px-24">
      <h1 className="text-4xl">CRA Tailwind CSS Boilerplate</h1>
      <p className="text-lg">
        A sophisticated boilerplate for creating react applications with
        tailwind css
      </p>

      <div className="mt-4">
        {pokemons.status.state === SliceStatus.LOADING ? (
          <Skeleton />
        ) : (
          <div className="mx-auto w-3/4 grid grid-cols-3 gap-3">
            {pokemons.data.map((pokemon) => (
              <PokemonCard key={pokemon.id} {...pokemon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
