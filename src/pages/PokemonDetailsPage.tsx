import React from "react";
import ProgressiveImage from "react-progressive-image-loading";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import { importPokemonImage } from "../globals";

const PokemonDetailsPage = () => {
  const history = useHistory();

  return (
    <Layout title="Pokemon Details">
      <button
        className="text-primary font-semibold transform hover:-translate-y-1 transition-transform ease-in duration-150 focus:outline-none"
        onClick={() => history.push("/")}
      >
        <span className="text-primary font-semibold">Go Back</span>
      </button>
      <div
        className="flex flex-col lg:flex-row justify-center items-start w-full mx-auto my-8 rounded-lg"
        style={{
          backgroundColor: "#6890F0",
        }}
      >
        <div className="w-full">
          <div className="px-4 md:px-8 lg:px-12">
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
                width: 150,
                height: 150,
                backgroundColor: "#85A5F0",
                bottom: 70,
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

        <div className="bg-white lg:mt-0 shadow-lg rounded-lg overflow-hidden w-full h-full">
          <h1>Content</h1>
        </div>
      </div>
    </Layout>
  );
};
export default PokemonDetailsPage;
