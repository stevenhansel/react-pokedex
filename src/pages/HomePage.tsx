import React from "react";
import Form from "../components/Form";

import Layout from "../components/Layout";
import PokemonList from "../components/PokemonList";

const HomePage: React.FC = () => {
  const onSubmit = () => {};

  return (
    <Layout title="Home">
      <div className="px-6 md:px-24 lg:px-48 mt-6 md:mt-10">
        <h1 className="text-3xl lg:text-5xl font-bold">React Pokédex</h1>
        <div className="my-4 md:my-6 lg:my-8">
          <Form
            submitHandler={onSubmit}
            placeholder="Search for a pokémon..."
          />
        </div>
        <div>
          <PokemonList />
        </div>
      </div>
    </Layout>
  );
};
export default HomePage;
