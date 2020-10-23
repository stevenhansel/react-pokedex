import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { Waypoint } from "react-waypoint";
import { getPokemons, pokemonsSelector } from "../features/pokemonSlice";
import { SliceStatus } from "../globals";
import PokemonCard from "./PokemonCard";

const PokemonList: React.FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const pokemons = useSelector(pokemonsSelector);

  useEffect(() => {
    dispatch(getPokemons({ page }));
  }, [dispatch, page]);

  return (
    <>
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
    </>
  );
};
export default PokemonList;
