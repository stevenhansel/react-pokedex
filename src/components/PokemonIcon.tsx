import React from "react";

type Props = {
  alt: string;
  src: string;
};

const PokemonIcon: React.FC<Props> = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        height: 30,
        width: 30,
      }}
    />
  );
};

export default PokemonIcon;
