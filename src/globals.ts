import TogepiImage from "./assets/pokemons/togepi.png";
import CharizardImage from "./assets/pokemons/charizard.png";
import BlastoiseImage from "./assets/pokemons/blastoise.png";
import VenusaurImage from "./assets/pokemons/venusaur.png";
import AerodactylImage from "./assets/pokemons/aerodactyl.png";
import LucarioImage from "./assets/pokemons/lucario.png";
import SeviperImage from "./assets/pokemons/seviper.png";
import PikachuImage from "./assets/pokemons/pikachu.png";
import DiglettImage from "./assets/pokemons/diglett.png";
import MewImage from "./assets/pokemons/mew.png";
import RegiceImage from "./assets/pokemons/regice.png";
import ButterfreeImage from "./assets/pokemons/butterfree.png";
import DragoniteImage from "./assets/pokemons/dragonite.png";
import OnixImage from "./assets/pokemons/onix.png";
import GangerImage from "./assets/pokemons/ganger.png";
import WeavileImage from "./assets/pokemons/weavile.png";
import KlinklangImage from "./assets/pokemons/klinklang.png";
import ClefableImage from "./assets/pokemons/clefable.png";

export enum SliceStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export const PokemonTypeColors = {
  normal: {
    light: "#CDCDB9",
    medium: "#C4C4A4",
  },
  fire: {
    light: "#F4934D",
    medium: "#F08030",
  },
  fighting: {
    light: "#BA5852",
    medium: "#C03028",
  },
  water: {
    light: "#85A5F0",
    medium: "#6890F0",
  },
  flying: {
    light: "#B8A5F2",
    medium: "#A890F0",
  },
  grass: {
    light: "#99D07D",
    medium: "#78C850",
  },
  poison: {
    light: "#A768A7",
    medium: "#A040A0",
  },
  electric: {
    light: "#F9DF78",
    medium: "#F8D030",
  },
  ground: {
    light: "#EDD081",
    medium: "#E0C068",
  },
  psychic: {
    light: "#F47DA1",
    medium: "#F85888",
  },
  rock: {
    light: "#C5B059",
    medium: "#B8A038",
  },
  ice: {
    light: "#B3E1E1",
    medium: "#98D8D8",
  },
  bug: {
    light: "#B5C534",
    medium: "#A8B820",
  },
  dragon: {
    light: "#8656FA",
    medium: "#7038F8",
  },
  ghost: {
    light: "#7D6B9B",
    medium: "#705898",
  },
  dark: {
    light: "#756459",
    medium: "#705848",
  },
  steel: {
    light: "#C1C1D1",
    medium: "#B8B8D0",
  },
  fairy: {
    light: "#EFA7B7",
    medium: "#EE99AC",
  },
};

export const PokemonTypePlaceholders = {
  normal: TogepiImage,
  fire: CharizardImage,
  fighting: LucarioImage,
  water: BlastoiseImage,
  flying: AerodactylImage,
  grass: VenusaurImage,
  poison: SeviperImage,
  electric: PikachuImage,
  ground: DiglettImage,
  psychic: MewImage,
  rock: OnixImage,
  ice: RegiceImage,
  bug: ButterfreeImage,
  dragon: DragoniteImage,
  ghost: GangerImage,
  dark: WeavileImage,
  steel: KlinklangImage,
  fairy: ClefableImage,
};
