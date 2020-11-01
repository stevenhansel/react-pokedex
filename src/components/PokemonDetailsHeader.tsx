import React from "react";
import ProgressiveImage from "react-progressive-image-loading";
import { importPokemonImage } from "../globals";

const PokemonDetailsHeader = () => {
  return (
    <>
      <div className="w-full">
        <div className="px-4 md:px-8">
          <p className="text-md mt-4 text-white font-medium">#001</p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold pb-6">
            Blastoise
          </h1>
        </div>

        <div
          className="relative text-center mx-auto w-full"
          style={{ height: 325 }}
        >
          <h1 className="absolute -mt-2 text-6xl z-0 w-full text-white opacity-50 font-extrabold overflow-hidden">
            カメックス
          </h1>

          <div
            className="rounded-full absolute inset-x-auto mx-auto z-0 inline-block left-0 right-0"
            style={{
              width: 225,
              height: 225,
              backgroundColor: "#85A5F0",
              bottom: 40,
            }}
          />
          <ProgressiveImage
            preview={importPokemonImage("blastoise")}
            src={importPokemonImage("blastoise")}
            render={(src, style) => (
              <img
                src={src}
                alt={"charizard"}
                style={{
                  ...style,
                  width: 325,
                  height: 325,
                  position: "absolute",
                  display: "block",
                  left: 0,
                  right: 0,
                  margin: "auto",
                }}
              />
            )}
          />
        </div>
      </div>
      <div className="-mt-12" />
    </>
  );
};

export default PokemonDetailsHeader;
