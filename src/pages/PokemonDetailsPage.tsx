import React from "react";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";

const PokemonDetailsPage = () => {
  const history = useHistory();

  return (
    <Layout title="Pokemon Details">
      <button onClick={() => history.push("/")}>Go Back</button>
      <div className="h-96" style={{ backgroundColor: "black" }}>
        Layout 1<div className="bg-white">Layout 2</div>
      </div>
    </Layout>
  );
};
export default PokemonDetailsPage;
