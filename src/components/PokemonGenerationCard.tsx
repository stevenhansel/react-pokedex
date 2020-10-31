import React from "react";
import { romanize } from "../utils/romanize";

type Props = {
  images: string[];
  generation: number;
  isSelected: boolean;
  handleClick: () => void;
};

const PokemonGenerationCard = ({
  images,
  generation,
  isSelected,
  handleClick,
}: Props) => {
  return (
    <div
      onClick={() => handleClick()}
      // className="w-full tracking-wide text-center text-black bg-primaryGray mx-auto px-8 py-5 rounded-lg hover:bg-primarySecondary hover:text-white hover:font-medium transition-all duration-200 ease-in-out cursor-pointer"
      className={
        "w-full tracking-wide text-center mx-auto px-8 py-5 rounded-lg hover:font-medium transition-all duration-200 ease-in-out cursor-pointer " +
        (isSelected
          ? "bg-primarySecondary text-white transform hover:-translate-y-2 hover:shadow-md"
          : "bg-primaryGray text-black hover:bg-primarySecondary hover:text-white")
      }
    >
      <div className="flex justify-center items-center">
        {images.map((image) => (
          <img key={image} className="w-16 h-16" src={image} alt="Pokemon" />
        ))}
      </div>
      <p className="text-md mt-4">Generation {romanize(generation)}</p>
    </div>
  );
};
export default PokemonGenerationCard;
