import React from "react";
import { romanize } from "../utils/romanize";

type Props = {
  images: string[];
  generation: number;
};

const PokemonGenerationCard = ({ images, generation }: Props) => {
  return (
    <div className="w-full bg-primaryGray mx-auto px-8 py-5 rounded-lg">
      <div className="flex">
        {images.map((image) => (
          <img className="w-20 h-20" src={image} alt="Pokemon" />
        ))}
      </div>
      <p className="text-black text-center mt-4">
        Generation {romanize(generation)}
      </p>
    </div>
  );
};
export default PokemonGenerationCard;
