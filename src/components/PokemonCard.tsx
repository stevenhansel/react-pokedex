import React, { useRef } from "react";
import { Pokemon } from "../features/pokemonSlice";
import { PokemonTypeColors, PokemonTypePlaceholders } from "../globals";
import { leftPad } from "../utils/leftPad";
import { useSpring, animated } from "react-spring";
import Trail from "./Trail";
import ProgressiveImage from "react-progressive-image-loading";
import { useHistory } from "react-router-dom";
import { useResize } from "../hooks/useResize";

const MaskStyling = {
  width: 130,
  height: 130,
  zIndex: -10,
  bottom: 8,
  left: 16,
};
const ImageContainerStyling = {
  width: 175,
  height: 175,
};

type Props = Pokemon;

const calc = (x: number, y: number, width: number, height: number) => {
  const WINDOW_DIVIDER = 60;
  return [
    -(y - height / 2) / WINDOW_DIVIDER,
    (x - width / 2) / WINDOW_DIVIDER,
    1.025,
  ];
};

const trans = (x: number, y: number, z: number) => {
  return `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${z})`;
};

const PokemonCard = ({ id, name, sprites, types }: Props) => {
  const history = useHistory();
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 8, tension: 350, friction: 40 },
  }));
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { width, height, top, left } = useResize(cardRef);

  const backgroundColors = types.map(({ type }) => {
    const [[, backgroundColor]] = Object.entries(PokemonTypeColors).filter(
      ([key, _]) => key === type.name
    );

    return backgroundColor;
  });
  const imagePlaceholder = types.map(({ type }) => {
    const [[, image]] = Object.entries(PokemonTypePlaceholders).filter(
      ([key, _]) => key === type.name
    );

    return image;
  });

  return (
    <div ref={cardRef}>
      <Trail open={true}>
        <animated.div
          onMouseMove={({ clientX, clientY }) =>
            set({
              xys: calc(clientX - left, clientY - top, width, height - top),
            })
          }
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          className="w-full rounded-lg overflow-hidden shadow-lg mx-auto cursor-pointer hover:shadow-2xl transition-all duration-75 ease-in-out"
          style={{
            // @ts-ignore
            transform: props.xys.interpolate(trans),
            backgroundColor: backgroundColors[0].medium,
          }}
          onClick={() => history.push(`/pokemons/${id}`)}
        >
          <div
            className="py-32 mx-auto w-full flex items-center justify-center relative"
            style={{
              backgroundColor: backgroundColors[0].medium,
            }}
          >
            <p className="text-6xl font-semibold text-black text-opacity-25 absolute tracking-xl top-1/8 pointer-events-none">
              #{leftPad(id, 3)}
            </p>

            <div
              className="inset-x-auto bottom-0 absolute z-20"
              style={ImageContainerStyling}
            >
              <div
                className="rounded-full absolute z-0 inset-x-auto mx-auto"
                style={{
                  ...MaskStyling,
                  backgroundColor: backgroundColors[0].light,
                }}
              />
              <ProgressiveImage
                preview={imagePlaceholder[0]}
                src={sprites.frontDefault}
                render={(src, style) => (
                  <img src={src} style={style} alt={name} />
                )}
              />
            </div>
          </div>

          <div className="bg-white w-full pt-5 pb-8 text-center">
            <h1 className="capitalize font-semibold text-3xl mb-2">{name}</h1>
            <div className="flex flex-wrap mx-auto justify-center">
              {types.map(({ type }, index) => {
                return (
                  <p
                    key={`${id}-${type.name}`}
                    className={
                      "font-bold uppercase text-sm" +
                      (index !== types.length - 1 ? " mr-6" : "")
                    }
                    style={{ color: backgroundColors[index].medium }}
                  >
                    {type.name}
                  </p>
                );
              })}
            </div>
          </div>
        </animated.div>
      </Trail>
    </div>
  );
};

export default PokemonCard;
