import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import PokemonDetailsBiography from "../components/PokemonDetailsBiography";
import PokemonDetailsEvolutions from "../components/PokemonDetailsEvolutions";
import PokemonDetailsHeader from "../components/PokemonDetailsHeader";
import PokemonDetailsStats from "../components/PokemonDetailsStats";
import Tab from "../components/Tab";

type PokemonTabs = "biography" | "stats" | "evolutions";

const PokemonDetailsPage = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState<PokemonTabs>("biography");

  return (
    <Layout title="Pokemon Details">
      <button
        className="text-primary font-semibold transform hover:-translate-y-1 transition-transform ease-in duration-150 focus:outline-none"
        onClick={() => history.push("/")}
      >
        <span className="text-primary font-semibold">Go Back</span>
      </button>
      <div
        className="flex flex-col lg:flex-row justify-center items-start w-full mx-auto my-8 rounded-lg shadow-lg"
        style={{
          backgroundColor: "#6890F0",
        }}
      >
        <PokemonDetailsHeader />

        <div className="bg-white lg:mt-0 rounded-t-3xl rounded-b-lg lg:rounded-t-none lg:rounded-b-none lg:rounded-r-lg overflow-hidden lg:overflow-y-scroll w-full pt-20 lg:pt-8 px-4 md:px-8 lg:px-12">
          <div className="flex flex-row justify-evenly w-full">
            <Tab
              handleSelect={() => setActiveTab("biography")}
              isSelected={activeTab === "biography"}
            >
              Biography
            </Tab>
            <Tab
              handleSelect={() => setActiveTab("stats")}
              isSelected={activeTab === "stats"}
            >
              Stats
            </Tab>
            <Tab
              handleSelect={() => setActiveTab("evolutions")}
              isSelected={activeTab === "evolutions"}
            >
              Evolutions
            </Tab>
          </div>
          <div className="lg:h-120">
            {activeTab === "biography" && <PokemonDetailsBiography />}
            {activeTab === "stats" && <PokemonDetailsStats />}
            {activeTab === "evolutions" && <PokemonDetailsEvolutions />}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default PokemonDetailsPage;
