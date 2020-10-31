import React from "react";

const PokemonSkeleton = () => {
  return (
    <div
      className="w-full rounded-lg overflow-hidden shadow-lg mx-auto cursor-pointer hover:shadow-2xl transition-all duration-75 ease-in-out"
      style={{
        backgroundColor: "#E3E3E3",
      }}
    >
      <div
        className="py-32 mx-auto w-full flex items-center justify-center relative"
        style={{
          backgroundColor: "#E3E3E3",
        }}
      >
        <p className="text-6xl font-semibold text-black text-opacity-25 absolute tracking-xl top-1/8 pointer-events-none"></p>

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
              backgroundColor: "#E3E3E3",
              zIndex: -10,
              bottom: 8,
              left: 16,
            }}
          />
        </div>
      </div>
      <div className="animate-pulse flex  w-full">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-400 rounded w-3/4"></div>
          <div className="space-y-2"></div>
        </div>
        <div className="bg-white w-full pt-5 pb-8 text-center">
          <h1 className="capitalize font-semibold text-3xl mb-2 inline-block mx-auto w-32">
            <div className="h-6 bg-gray-300 rounded"></div>
          </h1>
          <div className="flex flex-wrap mx-auto justify-center">
            <div className="h-6 bg-gray-300 rounded w-16 mr-4"></div>
            <div className="h-6 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PokemonSkeleton;
