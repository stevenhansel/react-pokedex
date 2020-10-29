import React from "react";
import { Pokemon } from "../features/pokemonSlice";
import { PokemonTypeColors } from "../globals";
import { leftPad } from "../utils/leftPad";
import { useSpring, animated } from "react-spring";

type Props = Pokemon & { position: number };

const calc = (x: number, y: number, position: number) => {
  let positionDivider: number = 2;
  switch (position) {
    case 0:
      positionDivider = 4;
      break;
    case 1:
      positionDivider = 2;
      break;
    case 2:
      positionDivider = 1.5;
      break;
    default:
      break;
  }
  return [
    -(y - window.innerHeight / positionDivider) / 60,
    (x - window.innerWidth / positionDivider) / 60,
    1,
  ];
};

const trans = (x: number, y: number, z: number) => {
  return `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${z})`;
};

const PokemonCard = ({ id, name, sprites, types, position }: Props) => {
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

  console.log(`position: ${position}`);

  return (
    <animated.div
      onMouseMove={({ clientX: x, clientY: y }) =>
        set({ xys: calc(x, y, position) })
      }
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{
        // @ts-ignore
        transform: props.xys.interpolate(trans),
        backgroundColor: backgroundColors[0].medium,
      }}
      className="w-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl mx-auto cursor-pointer transition-all duration-75 ease-in-out"
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
          <img src={sprites.frontDefault} alt={name} />
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
  );
};

export default PokemonCard;
