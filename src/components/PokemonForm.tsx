import React, { useEffect, useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  PokemonGenerationsEnum,
  searchPokemonsByNameReducer,
  filterPokemonsByGenerationReducer,
  randomizePokemonsReducer,
} from "../features/cachedPokemonsSlice";
import {
  pokemonsSelector,
  resetPokemonsReducer,
} from "../features/pokemonSlice";
import { SliceStatus } from "../globals";
import PokemonGenerations from "./PokemonGenerations";

type Props = {
  mutatePage: React.Dispatch<React.SetStateAction<number>>;
  placeholder?: string;
  initialValue?: string;
  changeHandler?: () => void;
};

const PokemonForm = ({
  placeholder,
  initialValue = "",
  changeHandler,
  mutatePage,
}: Props) => {
  const dispatch = useDispatch();
  const pokemons = useSelector(pokemonsSelector);
  const [value, setValue] = useState<string>(initialValue);
  const [
    selectedGeneration,
    setSelectedGeneration,
  ] = useState<PokemonGenerationsEnum | null>(null);
  const inputRef = useRef(0);

  const isLoading = pokemons.status.state === SliceStatus.LOADING;

  useEffect(() => {
    if (changeHandler) {
      clearTimeout(inputRef.current);
      inputRef.current = window.setTimeout(() => {
        changeHandler();
      }, 100);
    }
  }, [value, changeHandler]);

  const submitFormHandler = () => {
    if (!isLoading) {
      dispatch(resetPokemonsReducer({}));
      dispatch(searchPokemonsByNameReducer({ pokemonName: value }));
      mutatePage(0);
    }
  };

  const changeGenerationHandler = () => {
    if (!isLoading) {
      dispatch(resetPokemonsReducer({}));
      dispatch(filterPokemonsByGenerationReducer({ selectedGeneration }));
      if (selectedGeneration === null) {
        dispatch(randomizePokemonsReducer({}));
        mutatePage(0);
      } else {
        mutatePage(0);
      }
    }
  };

  return (
    <div className="flex items-center justify-center md:justify-start flex-wrap">
      <div className="relative inline-flex">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <div className="absolute flex items-center justify-center pointer-events-none">
            <GoSearch color="#8A8A8A" />
          </div>
        </span>

        <input
          className="py-2 pl-10 md:pr-24 lg:pr-48  w-full text-sm rounded-lg bg-primaryGray text-tertiaryGray placeholder-tertiaryGray appearance-none focus:outline-none focus:font-medium focus:border-secondaryGray"
          placeholder={placeholder || "Search an item..."}
          value={value}
          onKeyPress={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") {
              submitFormHandler();
            }
          }}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setValue(e.currentTarget.value)
          }
        />
      </div>

      <div className="ml-2 md:ml-5 mt-3 md:mt-0">
        <PokemonGenerations
          selectedGeneration={selectedGeneration}
          setSelectedGeneration={setSelectedGeneration}
          changeGenerationHandler={changeGenerationHandler}
          isLoading={isLoading}
        />
      </div>

      <button
        className={
          "ml-2 md:ml-5 mt-3 md:mt-0 bg-primary py-1 px-8 rounded-md text-white font-semibold  focus:outline-none transition duration-200 ease-in-out" +
          (isLoading
            ? " opacity-25 cursor-default"
            : " hover:bg-white hover:text-primary transform hover:-translate-y-1 cursor-pointer")
        }
        onClick={submitFormHandler}
      >
        Search
      </button>
    </div>
  );
};

export default PokemonForm;
