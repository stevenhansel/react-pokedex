import React from "react";
import { Pokemon } from "../features/pokemonSlice";
import { PokemonTypeColors } from "../globals";
import { leftPad } from "../utils/leftPad";
import { useSpring, animated } from "react-spring";
import Trail from "./Trail";

type Props = Pokemon & {
  position: number;
  numCols: number;
};

const calc = (x: number, y: number, position: number, numCols: number) => {
  const WINDOW_DIVIDER = 50;
  const Y_DIVIDER = 0.5;
  let positionDivider: number = 0.5;

  switch (numCols) {
    case 1:
      positionDivider = 0.5;
      break;
    case 2:
      if (position === 0) positionDivider = 0.3;
      if (position === 1) positionDivider = 0.7;
      break;
    case 3:
      if (position === 0) positionDivider = 0.25;
      if (position === 1) positionDivider = 0.5;
      if (position === 2) positionDivider = 0.75;
      break;
    default:
      break;
  }

  return [
    -(y - window.innerHeight * Y_DIVIDER) / WINDOW_DIVIDER,
    (x - window.innerWidth * positionDivider) / WINDOW_DIVIDER,
    1,
  ];
};

const trans = (x: number, y: number, z: number) => {
  return `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${z})`;
};

const PokemonCard = React.memo(
  ({ id, name, sprites, types, position, numCols }: Props) => {
    const backgroundColors = types.map(({ type }) => {
      const [[, backgroundColor]] = Object.entries(PokemonTypeColors).filter(
        ([key, _]) => key === type.name
      );

      return backgroundColor;
    });
    const [props, set] = useSpring(() => ({
      xys: [0, 0, 1],
      config: { mass: 8, tension: 350, friction: 40 },
    }));

    return (
      <Trail open={true}>
        <animated.div
          onMouseMove={({ clientX: x, clientY: y }) =>
            set({ xys: calc(x, y, position, numCols) })
          }
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          className="w-full rounded-lg overflow-hidden shadow-lg mx-auto cursor-pointer hover:shadow-2xl transition-all duration-75 ease-in-out"
          style={{
            // @ts-ignore
            transform: props.xys.interpolate(trans),
            backgroundColor: backgroundColors[0].medium,
          }}
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
              style={{
                width: 175,
                height: 175,
              }}
            >
              <div
                className="rounded-full absolute z-0 inset-x-auto mx-auto"
                style={{
                  width: 130,
                  height: 130,
                  backgroundColor: backgroundColors[0].light,
                  zIndex: -10,
                  bottom: 8,
                  left: 16,
                }}
              />
              <img src={sprites.frontDefault} alt={name} loading="lazy" />
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
    );
  },
  (previousProps, nextProps) => previousProps.id === nextProps.id
);

export default PokemonCard;
