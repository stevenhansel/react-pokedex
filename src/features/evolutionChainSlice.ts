import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import fromApi from "../api/fromApi";
import { SliceStatus } from "../globals";
import { camelcaseObject } from "../utils/camelcaseObject";
import { RootState } from "./store";
import { NamedAPIResource } from "./types";
import { statusHandlerReducer, wrapReduxAsyncHandler } from "./utilities";

export type ChainLink = {
  isBaby: boolean;
  species: NamedAPIResource;
  evolutionDetails: {
    item: NamedAPIResource;
    trigger: NamedAPIResource;
    gender: number;
    heldItem: NamedAPIResource;
    knownMove: NamedAPIResource;
    knownMoveType: NamedAPIResource;
    location: NamedAPIResource;
    minLevel: NamedAPIResource;
    minHappiness: NamedAPIResource;
    minBeauty: NamedAPIResource;
    minAffection: NamedAPIResource;
    needsOverworldRain: boolean;
    partySpecies: NamedAPIResource;
    partyType: NamedAPIResource;
    relativePhysicalStats: number;
    timeOfDay: string;
    tradeSpecies: NamedAPIResource;
    turnUpsideDown: boolean;
  }[];
  evolvesTo: ChainLink[];
};

export type EvolutionChain = {
  id: number;
  babyTriggerItem: NamedAPIResource;
  chain: ChainLink;
};

type SliceState = {
  data: EvolutionChain[];
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

const evolutionChainSlice = createSlice({
  name: "evolutionChains",
  initialState,
  reducers: {
    ...statusHandlerReducer,
    getEvolutionChainReducer(
      state,
      action: PayloadAction<{ evolutionChain: EvolutionChain }>
    ) {
      const { evolutionChain } = action.payload;
      const isExist = state.data.find((e) => e.id === evolutionChain.id);
      if (!isExist) {
        state.data.push(evolutionChain);
      }
    },
  },
});

export const {
  initialize,
  error,
  success,
  getEvolutionChainReducer,
} = evolutionChainSlice.actions;
export const statusHandler = { initialize, error, success };

export const evolutionChainSelector = (state: RootState) =>
  state.evolutionChain;
export const evolutionChainReducer = evolutionChainSlice.reducer;

export const getEvolutionChainByName = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { name }) => {
    const result = await fromApi.getEvolutionChainByNameOrId(name);
    dispatch(
      getEvolutionChainReducer({ evolutionChain: camelcaseObject(result) })
    );
  }
);
export const getEvolutionChainById = wrapReduxAsyncHandler(
  statusHandler,
  async (dispatch, { id }) => {
    const result = await fromApi.getEvolutionChainByNameOrId(Number(id));
    dispatch(
      getEvolutionChainReducer({ evolutionChain: camelcaseObject(result) })
    );
  }
);
