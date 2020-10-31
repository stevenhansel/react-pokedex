import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import fromApi from "../api/fromApi";
import { SliceStatus } from "../globals";
import { RootState } from "./store";
import { NamedAPIResource } from "./types";
import { statusHandlerReducer, wrapReduxAsyncHandler } from "./utilities";
import Levenshtein from "fast-levenshtein";

export enum PokemonGenerationsEnum {
  GENERATION_1 = 151,
  GENERATION_2 = 251,
  GENERATION_3 = 386,
  GENERATION_4 = 493,
  GENERATION_5 = 649,
  GENERATION_6 = 721,
  GENERATION_7 = 809,
}

type SliceState = {
  data: (NamedAPIResource & { distance: number })[];
  status: {
    state: SliceStatus;
  };
};

const initialState: SliceState = {
  data: [],
  status: {
    state: SliceStatus.IDLE,
  },
};

const cachedPokemonsSlice = createSlice({
  name: "cachedPokemons",
  initialState,
  reducers: {
    ...statusHandlerReducer,
    getCachedPokemonsReducer(
      state,
      action: PayloadAction<{ cachedPokemons: NamedAPIResource[] }>
    ) {
      const { cachedPokemons } = action.payload;
      state.data = cachedPokemons.map((pokemon) => {
        return {
          ...pokemon,
          distance: 0,
        };
      });
    },
    searchPokemonsByNameReducer(
      state,
      action: PayloadAction<{ pokemonName: string }>
    ) {
      const { pokemonName } = action.payload;
      state.data = state.data
        .map((pokemon) => {
          return {
            ...pokemon,
            distance: Levenshtein.get(pokemon.name, pokemonName),
          };
        })
        .sort((a, b) => a.distance - b.distance);
    },
  },
});

export const cachedPokemonsReducer = cachedPokemonsSlice.reducer;
export const {
  initialize,
  error,
  success,
  getCachedPokemonsReducer,
  searchPokemonsByNameReducer,
} = cachedPokemonsSlice.actions;

const statusHandler = { initialize, error, success };

export const cachedPokemonsSelector = (state: RootState) =>
  state.cachedPokemons;

export const getCachedPokemons = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch) => {
    const {
      results,
    }: { results: NamedAPIResource[] } = await fromApi.getPokemons(
      PokemonGenerationsEnum.GENERATION_7
    );
    dispatch(getCachedPokemonsReducer({ cachedPokemons: results }));
  }
);
