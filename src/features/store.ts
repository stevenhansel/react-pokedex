import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cachedPokemonsReducer } from "./cachedPokemonsSlice";
import { evolutionChainReducer } from "./evolutionChainSlice";
import { pokemonsReducer } from "./pokemonSlice";
import { speciesReducer } from "./speciesSlice";

export const rootReducer = combineReducers({
  cachedPokemons: cachedPokemonsReducer,
  pokemons: pokemonsReducer,
  species: speciesReducer,
  evolutionChain: evolutionChainReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
