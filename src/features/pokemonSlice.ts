import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import fromApi from "../api/fromApi";
import { SliceStatus } from "../globals";
import { RootState } from "./store";
import { NamedAPIResource } from "./types";
import { camelcaseObject } from "../utils/camelcaseObject";
import { statusHandlerReducer, wrapReduxAsyncHandler } from "./utilities";
import { leftPad } from "../utils/leftPad";
import { baseImageUrl } from "../api/axios";

const INITIAL_SIZE = 3;
const PAGINATE_SIZE = 3;

export type Pokemon = {
  id: number;
  name: string;
  baseExperience: number;
  height: number;
  isDefault: boolean;
  order: number;
  weight: number;
  abilities: {
    isHidden: boolean;
    slot: number;
    ability: NamedAPIResource;
  }[];
  forms: NamedAPIResource[];
  moves: {
    move: NamedAPIResource;
  }[];
  sprites: {
    frontDefault: string;
    frontShiny: string;
    frontFemale: string;
    frontShinyFemale: string;
    backDefault: string;
    backShiny: string;
    backFemale: string;
    backShinyFemale: string;
  };
  species: NamedAPIResource[];
  stats: {
    baseStat: number;
    effort: number;
    stat: NamedAPIResource;
  }[];
  types: {
    slot: number;
    type: NamedAPIResource;
  }[];
};

type SliceState = {
  data: Pokemon[];
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

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    ...statusHandlerReducer,
    getPokemonsReducer(state, action: PayloadAction<{ pokemons: Pokemon[] }>) {
      const { pokemons } = action.payload;

      const existingPokemonIds = state.data.map((p) => p.id);
      const mergedPokemons = pokemons.filter(
        (pokemon) => !existingPokemonIds.includes(pokemon.id)
      );

      state.data = state.data.concat(mergedPokemons);
    },
    getPokemonByNameReducer(state, action) {
      const payload = action.payload;
      state.data.push(payload);
    },
  },
});

export const pokemonsReducer = pokemonsSlice.reducer;
export const {
  initialize,
  error,
  success,
  getPokemonsReducer,
  getPokemonByNameReducer,
} = pokemonsSlice.actions;

export const pokemonsSelector = (state: RootState) => state.pokemons;

const statusHandler = { initialize, error, success };

export const getPokemons = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { page }) => {
    const { results } = await fromApi.getPokemons(
      INITIAL_SIZE,
      page * PAGINATE_SIZE
    );

    const pokemons: Pokemon[] = [];
    for await (const { url } of results) {
      const pokemonId = Number(url.split("/").slice(-2)[0]);
      const pokemon = await fromApi.getPokemonById(pokemonId);
      const pokemonImageUrl = baseImageUrl + leftPad(pokemon.id, 3) + ".png";

      pokemons.push({
        ...camelcaseObject(pokemon),
        sprites: {
          frontDefault: pokemonImageUrl,
        },
      });
    }

    dispatch(getPokemonsReducer({ pokemons }));
  }
);

export const getPokemonByName = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { name }) => {}
);
