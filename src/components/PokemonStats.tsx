import React from "react";
type Props = {
  title: string;
  min: number;
  max: number;
};

const PokemonStats = ({ title, min, max }: Props) => {
  return (
    <div className="grid grid-cols-5 gap-2 md:gap-4 lg:gap-8 mt-2 md:mt-3">
      <span className="text-darkerGray font-medium">{title}</span>
      <span className="text-center">{min.toFixed(0)}</span>
      <div className="col-span-2 w-full flex items-center">
        <div className="w-full bg-transparent rounded-lg">
          <div
            className="bg-primary rounded-lg"
            style={{
              padding: "2.5px 0",
              width: `${(min / (max - 75)) * 100}%`,
            }}
          />
        </div>
      </div>
      <span className="text-center">{max.toFixed(0)}</span>
    </div>
  );
};
export default PokemonStats;
