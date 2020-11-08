import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import fromApi from "../api/fromApi";
import { SliceStatus } from "../globals";
import { camelcaseObject } from "../utils/camelcaseObject";
import { RootState } from "./store";
import { APIResource, NamedAPIResource } from "./types";
import { statusHandlerReducer, wrapReduxAsyncHandler } from "./utilities";

export type Species = {
  id: number;
  name: string;
  order: number;
  genderRate: number;
  captureRate: number;
  baseHappiness: number;
  isBaby: boolean;
  isLegendary: boolean;
  isMythical: boolean;
  hatchCounter: number;
  hasGenderDifferences: boolean;
  formsSwitchable: boolean;
  growthRate: NamedAPIResource;
  pokedexNumbers: {
    entryNumber: number;
    pokedex: NamedAPIResource;
  }[];
  eggGroups: NamedAPIResource[];
  color: NamedAPIResource;
  shape: NamedAPIResource;
  evolvesFromSpecies: NamedAPIResource;
  evolutionChain: APIResource;
  habitat: NamedAPIResource;
  generation: NamedAPIResource;
  names: {
    name: string;
    language: NamedAPIResource;
  }[];
  palParkEncounters: {
    baseScore: number;
    rate: number;
    area: {
      name: string;
      url: string;
    };
  }[];
  flavorTextEntries: {
    flavorText: string;
    language: NamedAPIResource;
    version: NamedAPIResource;
  }[];
  formDescriptions: {
    description: string;
    language: NamedAPIResource;
  }[];
  genera: {
    genus: string;
    language: NamedAPIResource;
  }[];
  varieties: {
    isDefault: boolean;
    pokemon: NamedAPIResource;
  }[];
};

type SliceState = {
  data: Species[];
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

const speciesSlice = createSlice({
  name: "species",
  initialState,
  reducers: {
    ...statusHandlerReducer,
    getSpeciesReducer(state, action: PayloadAction<{ species: Species }>) {
      const { species } = action.payload;
      const isSpeciesAlreadyExists = state.data.find(
        (existingSpecies) => existingSpecies.id === species.id
      );
      if (!isSpeciesAlreadyExists) {
        state.data.push(species);
      }
    },
  },
});

export const speciesReducer = speciesSlice.reducer;
export const {
  initialize,
  error,
  success,
  getSpeciesReducer,
} = speciesSlice.actions;

export const speciesSelector = (state: RootState) => state.species;

const statusHandler = { initialize, error, success };
export const getSpeciesByName = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { pokemonName }) => {
    const pokemonSpecies = await fromApi.getSpeciesByNameOrId(pokemonName);
    dispatch(getSpeciesReducer({ species: camelcaseObject(pokemonSpecies) }));
  }
);

export const getSpeciesById = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { pokemonId }) => {
    const pokemonSpecies = await fromApi.getSpeciesByNameOrId(pokemonId);

    dispatch(getSpeciesReducer({ species: camelcaseObject(pokemonSpecies) }));
  }
);
