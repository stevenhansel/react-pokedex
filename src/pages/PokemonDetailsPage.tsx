import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { PokemonTypeColors, SliceStatus } from "../globals";
import { ScaleLoader } from "react-spinners";
import { useTransition, animated } from "react-spring";
import { capitalize } from "../utils/capitalize";
import { ChainLink } from "../features/evolutionChainSlice";

import {
  getPokemonById,
  getPokemonsDynamically,
  pokemonsSelector,
  getSpeciesById,
  speciesSelector,
  evolutionChainSelector,
  getEvolutionChainById,
} from "../features";

import {
  Layout,
  PokemonDetailsBiography,
  PokemonDetailsEvolutions,
  PokemonDetailsHeader,
  PokemonDetailsStats,
  Tab,
} from "../components";

type PokemonTabs = "biography" | "stats" | "evolutions";

interface MatchParams {
  id: string;
}

const PokemonDetailsPage = ({ match }: RouteComponentProps<MatchParams>) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState<PokemonTabs>("biography");
  const transitions = useTransition(activeTab, (p) => p, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 250,
    },
  });

  const pokemons = useSelector(pokemonsSelector);
  const species = useSelector(speciesSelector);
  const evolutionChain = useSelector(evolutionChainSelector);
  const [chainLinks, setChainLinks] = useState<ChainLink[]>([]);
  const [
    selectedEvolutionPokemonIds,
    setSelectedEvolutionPokemonIds,
  ] = useState<number[]>([]);

  const selectedPokemon = pokemons.data.find(
    (pokemon) => pokemon !== null && pokemon.id === Number(id)
  );
  const selectedSpecies = species.data.find((s) => s.id === Number(id));
  const evolutionChainId =
    selectedSpecies?.evolutionChain?.url.split("/").slice(-2)[0] || null;
  const selectedEvolutionChain =
    evolutionChainId !== null
      ? evolutionChain.data.find((e) => e.id === Number(evolutionChainId))
      : null;

  const getPokemonEvolution = useCallback(
    (chain: ChainLink | null): ChainLink[] => {
      if (!chain) {
        return [];
      } else {
        return [chain].concat(getPokemonEvolution(chain.evolvesTo[0]));
      }
    },
    []
  );

  useEffect(() => {
    if (selectedEvolutionChain?.chain) {
      const pokemons: ChainLink[] = getPokemonEvolution(
        selectedEvolutionChain.chain
      );
      const pokemonIds = pokemons.map(({ species }) =>
        Number(species.url.split("/").slice(-2)[0])
      );
      dispatch(getPokemonsDynamically({ pokemonIds }));
      setSelectedEvolutionPokemonIds(pokemonIds);
      setChainLinks(pokemons);
    }
    //eslint-disable-next-line
  }, [selectedEvolutionChain]);

  useEffect(() => {
    if (pokemons.data.length === 0) {
      dispatch(getPokemonById({ pokemonId: id }));
    }
    dispatch(getSpeciesById({ pokemonId: id }));
    //eslint-disable-next-line
  }, [id, pokemons.data.length]);

  useEffect(() => {
    if (evolutionChainId) {
      dispatch(getEvolutionChainById({ id: Number(evolutionChainId) }));
    }
    //eslint-disable-next-line
  }, [selectedPokemon, evolutionChainId]);

  const backgroundColors = selectedPokemon?.types.map(({ type }) => {
    const [[, backgroundColor]] = Object.entries(PokemonTypeColors).filter(
      ([key, _]) => key === type.name
    );

    return backgroundColor;
  });

  const selectedBackgroundColor = backgroundColors && backgroundColors[0];

  const isPageLoading =
    species.status.state === SliceStatus.IDLE ||
    species.status.state === SliceStatus.LOADING ||
    evolutionChain.status.state === SliceStatus.IDLE ||
    evolutionChain.status.state === SliceStatus.LOADING ||
    pokemons.status.state === SliceStatus.IDLE ||
    pokemons.status.state === SliceStatus.LOADING;

  return (
    <Layout title={capitalize(selectedPokemon?.name)}>
      {isPageLoading ? (
        <div className="mx-auto mt-12 text-center">
          <ScaleLoader color="#E3350D" radius={16} />
        </div>
      ) : (
        <>
          <>
            {selectedPokemon &&
              selectedSpecies &&
              selectedBackgroundColor &&
              selectedEvolutionChain && (
                <div className="pb-8">
                  <button
                    className="font-semibold text-primary transform hover:-translate-y-1 transition-transform ease-in duration-150 focus:outline-none"
                    onClick={() => history.push("/")}
                  >
                    <span className="font-semibold text-primary">Go Back</span>
                  </button>
                  <div
                    className="flex flex-col items-start justify-center w-full mx-auto my-4 rounded-lg shadow-lg lg:flex-row"
                    style={{
                      backgroundColor:
                        selectedBackgroundColor &&
                        selectedBackgroundColor.medium,
                    }}
                  >
                    <PokemonDetailsHeader
                      pokemon={selectedPokemon}
                      species={selectedSpecies}
                      selectedBackgroundColor={selectedBackgroundColor}
                    />
                    <div className="w-full px-6 pt-16 overflow-hidden bg-white rounded-b-lg lg:mt-0 rounded-t-3xl lg:rounded-t-none lg:rounded-b-none lg:rounded-r-lg lg:pt-8 md:px-12 lg:px-24">
                      <div className="flex flex-row justify-between w-full">
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
                      <div className="relative mt-8 lg:h-178">
                        {transitions.map(({ item, key, props }) => {
                          let page: JSX.Element = (
                            <PokemonDetailsBiography
                              species={selectedSpecies}
                              pokemon={selectedPokemon}
                            />
                          );

                          switch (item) {
                            case "biography":
                              page = (
                                <PokemonDetailsBiography
                                  species={selectedSpecies}
                                  pokemon={selectedPokemon}
                                />
                              );
                              break;
                            case "stats":
                              page = (
                                <PokemonDetailsStats
                                  pokemon={selectedPokemon}
                                />
                              );
                              break;
                            case "evolutions":
                              page = (
                                <PokemonDetailsEvolutions
                                  selectedIds={selectedEvolutionPokemonIds}
                                  chainLinks={chainLinks}
                                  selectedBackgroundColor={
                                    selectedBackgroundColor
                                  }
                                />
                              );
                              break;
                            default:
                              break;
                          }
                          return (
                            <animated.div
                              key={key}
                              style={{
                                ...props,
                                position: "relative",
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              {page}
                            </animated.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </>
        </>
      )}
    </Layout>
  );
};
export default PokemonDetailsPage;
