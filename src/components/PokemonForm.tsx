import React, { useEffect, useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { searchPokemonsByNameReducer } from "../features/cachedPokemonsSlice";
import {
  pokemonsSelector,
  resetPokemonsReducer,
} from "../features/pokemonSlice";
import { SliceStatus } from "../globals";
import PokemonGenerations from "./PokemonGenerations";

type Props = {
  resetPage: React.Dispatch<React.SetStateAction<number>>;
  trigger: () => void;
  placeholder?: string;
  initialValue?: string;
  changeHandler?: () => void;
};

const PokemonForm = ({
  placeholder,
  initialValue = "",
  changeHandler,
  resetPage,
  trigger,
}: Props) => {
  const dispatch = useDispatch();
  const pokemons = useSelector(pokemonsSelector);
  const [value, setValue] = useState<string>(initialValue);
  const inputRef = useRef(0);

  useEffect(() => {
    if (changeHandler) {
      clearTimeout(inputRef.current);
      inputRef.current = window.setTimeout(() => {
        changeHandler();
      }, 100);
    }
  }, [value, changeHandler]);

  const submitFormHandler = () => {
    if (!(pokemons.status.state === SliceStatus.LOADING)) {
      console.log("initialize form");
      dispatch(resetPokemonsReducer({}));
      dispatch(searchPokemonsByNameReducer({ pokemonName: value }));
      resetPage(0);
      trigger();
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
          className="py-2 pl-10 md:pr-24 lg:pr-48  w-full text-sm rounded-lg bg-primaryGray text-tertiaryGray placeholder-tertiaryGray placeholder-opacity-100"
          type="search"
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

      <div className="ml-5 mt-3 md:mt-0">
        <PokemonGenerations />
      </div>

      <button
        className="ml-5 mt-3 md:mt-0 bg-primary py-1 px-8 rounded-md text-white font-semibold hover:bg-white hover:text-primary focus:outline-none transition duration-200 ease-in-out"
        onClick={submitFormHandler}
      >
        Search
      </button>
    </div>
  );
};

export default PokemonForm;
