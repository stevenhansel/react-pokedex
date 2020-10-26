import React from "react";

import Layout from "../components/Layout";
import PokemonList from "../components/PokemonList";

const HomePage: React.FC = () => {
  return (
    <Layout title="Home">
      <div className="text-center">
        <h1 className="text-4xl">React Pokedex</h1>
        <p className="text-lg">
          A sophisticated pokedex built with react using the PokeAPI.
        </p>
        <div className="mt-16">
          <PokemonList />
        </div>
      </div>
    </Layout>
  );
};
export default HomePage;
