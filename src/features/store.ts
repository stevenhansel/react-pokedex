import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cachedPokemonsReducer } from "./cachedPokemonsSlice";
import { pokemonsReducer } from "./pokemonSlice";

export const rootReducer = combineReducers({
  cachedPokemons: cachedPokemonsReducer,
  pokemons: pokemonsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
