import React from "react";

import Layout from "../components/Layout";

const HomePage: React.FC = () => {
  return (
    <Layout title="Home">
      <div className="text-center">
        <h1 className="text-4xl font-bold">React Pokedex</h1>
      </div>
    </Layout>
  );
};
export default HomePage;
