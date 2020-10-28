import React from "react";
import PokemonForm from "../components/PokemonForm";

import Layout from "../components/Layout";
import PokemonList from "../components/PokemonList";

const HomePage: React.FC = () => {
  const onSubmit = () => {};

  return (
    <Layout title="Home">
      <div className="px-6 md:px-24 lg:px-64 mt-6 md:mt-10">
        <h1 className="text-3xl lg:text-5xl font-semibold">React Pokédex</h1>
        <div className="my-4 md:my-6 lg:my-8 w-full">
          <PokemonForm
            submitHandler={onSubmit}
            placeholder="Search for a pokémon..."
          />
        </div>

        <div className="mx-auto w-full text-center">
          <PokemonList />
        </div>
      </div>
    </Layout>
  );
};
export default HomePage;
