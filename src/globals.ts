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

export const importImages = (image: string, filetype?: string) => {
  return `${process.env.PUBLIC_URL}/assets/images/${image}.${
    filetype || "png"
  }`;
};

export const importPokemonImage = (image: string) => {
  return `${process.env.PUBLIC_URL}/assets/pokemons/${image}.png`;
};

export const PokemonTypePlaceholders = {
  normal: importPokemonImage("togepi"),
  fire: importPokemonImage("charizard"),
  fighting: importPokemonImage("lucario"),
  water: importPokemonImage("blastoise"),
  flying: importPokemonImage("aerodactyl"),
  grass: importPokemonImage("venusaur"),
  poison: importPokemonImage("seviper"),
  electric: importPokemonImage("pikachu"),
  ground: importPokemonImage("diglett"),
  psychic: importPokemonImage("mew"),
  rock: importPokemonImage("onix"),
  ice: importPokemonImage("regice"),
  bug: importPokemonImage("butterfree"),
  dragon: importPokemonImage("dragonite"),
  ghost: importPokemonImage("ganger"),
  dark: importPokemonImage("weavile"),
  steel: importPokemonImage("klinklang"),
  fairy: importPokemonImage("clefable"),
};
