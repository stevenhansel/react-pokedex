import React from "react";

type Props = {
  type: string;
  backgroundColor: string;
};

const PokemonType: React.FC<Props> = ({ type, backgroundColor }) => {
  return (
    <div
      style={{
        backgroundColor,
      }}
      className="mr-2 capitalize tracking-wide font-bold rounded-lg shadow-md px-6 inline-flex items-center py-1 text-white"
    >
      <p>{type}</p>
    </div>
  );
};

export default PokemonType;
