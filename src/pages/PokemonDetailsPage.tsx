import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import Layout from "../components/Layout";
import PokemonDetailsBiography from "../components/PokemonDetailsBiography";
import PokemonDetailsEvolutions from "../components/PokemonDetailsEvolutions";
import PokemonDetailsHeader from "../components/PokemonDetailsHeader";
import PokemonDetailsStats from "../components/PokemonDetailsStats";
import Tab from "../components/Tab";
import { getPokemonById, pokemonsSelector } from "../features/pokemonSlice";
import { getSpeciesById, speciesSelector } from "../features/speciesSlice";
import { PokemonTypeColors, SliceStatus } from "../globals";
import { ScaleLoader } from "react-spinners";

type PokemonTabs = "biography" | "stats" | "evolutions";

interface MatchParams {
  id: string;
}

const PokemonDetailsPage = ({ match }: RouteComponentProps<MatchParams>) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState<PokemonTabs>("biography");
  const pokemons = useSelector(pokemonsSelector);
  const species = useSelector(speciesSelector);
  const selectedPokemon = pokemons.data.find(
    (pokemon) => pokemon !== null && pokemon.id === Number(id)
  );
  const selectedSpecies = species?.data.find((s) => s.id === Number(id));

  useEffect(() => {
    if (pokemons.data.length === 0) {
      dispatch(getPokemonById({ pokemonId: id }));
    }
    dispatch(getSpeciesById({ pokemonId: id }));
    //eslint-disable-next-line
  }, []);

  const backgroundColors = selectedPokemon?.types.map(({ type }) => {
    const [[, backgroundColor]] = Object.entries(PokemonTypeColors).filter(
      ([key, _]) => key === type.name
    );

    return backgroundColor;
  });

  const selectedBackgroundColor = backgroundColors && backgroundColors[0];

  return (
    <Layout title="Pokemon Details">
      {species.status.state === SliceStatus.IDLE ||
      species.status.state === SliceStatus.LOADING ? (
        <div className="text-center mx-auto mt-12">
          <ScaleLoader />
        </div>
      ) : (
        <>
          <>
            {selectedPokemon && selectedSpecies && selectedBackgroundColor && (
              <>
                <button
                  className="text-primary font-semibold transform hover:-translate-y-1 transition-transform ease-in duration-150 focus:outline-none"
                  onClick={() => history.push("/")}
                >
                  <span className="text-primary font-semibold">Go Back</span>
                </button>
                <div
                  className="flex flex-col lg:flex-row justify-center items-start w-full mx-auto my-8 rounded-lg shadow-lg"
                  style={{
                    backgroundColor:
                      selectedBackgroundColor && selectedBackgroundColor.medium,
                  }}
                >
                  <PokemonDetailsHeader
                    pokemon={selectedPokemon}
                    species={selectedSpecies}
                    selectedBackgroundColor={selectedBackgroundColor}
                  />

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
                      {activeTab === "evolutions" && (
                        <PokemonDetailsEvolutions />
                      )}
                    </div>
                  </div>
                </div>{" "}
              </>
            )}
          </>
        </>
      )}
    </Layout>
  );
};
export default PokemonDetailsPage;
