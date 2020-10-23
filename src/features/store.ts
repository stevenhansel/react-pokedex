import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { pokemonsReducer } from "./pokemonSlice";

export const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
