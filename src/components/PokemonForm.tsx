import React, { useEffect, useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import Modal from "./Modal";
import BulbasaurImage from "../assets/pokemons/bulbasaur.png";
import CharmanderImage from "../assets/pokemons/charmander.png";
import SquirtleImage from "../assets/pokemons/squirtle.png";
import PokemonIcon from "./PokemonIcon";

type Props = {
  submitHandler: (value: string) => void;
  placeholder?: string;
  initialValue?: string;
  changeHandler?: () => void;
};

const PokemonForm: React.FC<Props> = ({
  placeholder,
  initialValue = "",
  changeHandler,
  submitHandler,
}) => {
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
              submitHandler(value);
            }
          }}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setValue(e.currentTarget.value)
          }
        />
      </div>

      <div className="ml-5 mt-3 md:mt-0">
        <Modal>
          <Modal.Button className="bg-primaryGray px-4 py-1 rounded-lg text-white hover:border-transparent focus:outline-none transform hover:-translate-y-1 hover:shadow transition-all duration-200 ease-in-out">
            <div className="flex justify-between">
              <PokemonIcon src={BulbasaurImage} alt="Bulbasaur" />
              <PokemonIcon src={CharmanderImage} alt="Charmander" />
              <PokemonIcon src={SquirtleImage} alt="Squirtle" />
            </div>
          </Modal.Button>
          <Modal.Content />
        </Modal>
      </div>

      <button
        className="ml-5 mt-3 md:mt-0 bg-primary py-1 px-8 rounded-md text-white font-semibold hover:bg-white hover:text-primary focus:outline-none transition duration-200 ease-in-out"
        onClick={() => submitHandler(value)}
      >
        Search
      </button>
    </div>
  );
};

export default PokemonForm;
