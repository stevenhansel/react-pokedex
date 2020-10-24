import React from "react";
import PokemonList from "./components/PokemonList";

const App: React.FC = () => {
  return (
    <div className="text-center mt-2 sm:mt-6 md:mt-12 lg:mt-24 px-2 sm:px-6 md:px-12 lg:px-24">
      <h1 className="text-4xl">React Pokedex</h1>
      <p className="text-lg">
        A sophisticated pokedex built with react using the PokeAPI.
      </p>
      <div className="mt-16">
        <PokemonList />
      </div>
    </div>
  );
};

export default App;
