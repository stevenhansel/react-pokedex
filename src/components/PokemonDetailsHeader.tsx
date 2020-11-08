import React, { useRef } from "react";
import ProgressiveImage from "react-progressive-image-loading";
import { useSpring, animated } from "react-spring";
import { Pokemon } from "../features/pokemonSlice";
import { Species } from "../features/speciesSlice";
import { PokemonTypePlaceholders } from "../globals";
import { useResize } from "../hooks/useResize";
import { leftPad } from "../utils/leftPad";

const calc = (x: number, y: number, width: number, height: number) => [
  x - width / 2,
  y - height / 2,
];

const trans1 = (x: number, y: number) =>
  `translate3d(-${x / 30}px,-${y / 30}px,0)`;

const trans2 = (x: number, y: number) =>
  `translate3d(${x / 20}px,${y / 20}px,0)`;

const MaskSize = 225;
const ImageSize = 325;

const MaskStyling = {
  width: MaskSize,
  height: MaskSize,
  bottom: 55,
};

const PokemonImageStyling = {
  width: ImageSize,
  height: ImageSize,
  display: "block",
  left: 0,
  right: 0,
  bottom: 5,
  margin: "auto",
};

type Props = {
  pokemon: Pokemon;
  species: Species;
  selectedBackgroundColor: { light: string; medium: string };
};

const PokemonDetailsHeader = ({
  pokemon,
  species,
  selectedBackgroundColor,
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { width, height, top, left } = useResize(containerRef);
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  const kanjiName = species.names.find(
    (name) => name.language.name === "ja-Hrkt"
  );
  const imagePlaceholder = pokemon.types.map(({ type }) => {
    const [[, image]] = Object.entries(PokemonTypePlaceholders).filter(
      ([key, _]) => key === type.name
    );

    return image;
  });

  return (
    <>
      <div
        className="w-full"
        ref={containerRef}
        onMouseMove={({ clientX, clientY }) =>
          set({
            xy: calc(clientX - left, clientY - top, width + left, height + top),
          })
        }
      >
        <div className="px-4 md:px-8">
          <p className="text-md mt-4 text-white font-medium">
            #{leftPad(pokemon.id, 3)}
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold pb-6 capitalize">
            {pokemon.name}
          </h1>
        </div>

        <div className="relative text-center mx-auto w-full h-96 mt-8 lg:mt-24">
          <h1 className="absolute -mt-2 text-6xl z-0 w-full text-white opacity-50 font-extrabold overflow-hidden">
            {kanjiName && kanjiName.name}
          </h1>

          <animated.div
            style={{
              ...MaskStyling,
              backgroundColor: selectedBackgroundColor.light,
              //@ts-ignore
              transform: props.xy.interpolate(trans1),
            }}
            className="rounded-full absolute inset-x-auto mx-auto z-0 inline-block left-0 right-0"
          />

          <animated.div
            style={{
              ...PokemonImageStyling,
              position: "absolute",
              //@ts-ignore
              transform: props.xy.interpolate(trans2),
            }}
          >
            <ProgressiveImage
              preview={imagePlaceholder[0]}
              src={pokemon.sprites.frontDefault}
              render={(src, style) => (
                <img src={src} alt={pokemon.name} style={style} />
              )}
            />
          </animated.div>
        </div>
      </div>
      <div className="-mt-12" />
    </>
  );
};

export default PokemonDetailsHeader;
