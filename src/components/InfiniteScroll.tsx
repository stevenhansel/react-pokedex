import React, { useEffect, useState, useContext, createContext } from "react";
import { useDispatch } from "react-redux";
import { getPokemons, PAGINATE_SIZE } from "../features/pokemonSlice";
import { PokemonGenerationsEnum } from "../features/cachedPokemonsSlice";
import useTailwindMediaQuery from "../hooks/useTailwindMediaQuery";
import LoadButton from "./LoadButton";
import { randomize } from "../utils/randomize";
import { Waypoint as ReactWaypoint } from "react-waypoint";

type ContextType = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  numCols: number;
  setNumCols: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  paginationHandler: (
    page: number
  ) => (dispatch: React.Dispatch<any>) => Promise<void>;
};
const InfiniteScrollContext = createContext<ContextType>({
  page: 0,
  setPage: () => {},
  numCols: 0,
  setNumCols: () => {},
  isLoading: true,
  paginationHandler: getPokemons,
});

const Waypoint = () => {
  const { isLoading, setPage, page, paginationHandler } = useContext(
    InfiniteScrollContext
  );
  const dispatch = useDispatch();
  return (
    <div className="mt-48">
      <ReactWaypoint
        onEnter={() => {
          if (!isLoading) {
            setPage(page + PAGINATE_SIZE);
            dispatch(paginationHandler(page));
          }
        }}
      />
    </div>
  );
};

const Button = () => {
  const { isLoading, setPage, page } = useContext(InfiniteScrollContext);
  return (
    <div className="py-16 mx-auto">
      {isLoading ? null : (
        <div className="mt-6">
          <LoadButton
            clickHandler={() => {
              setPage(page + PAGINATE_SIZE);
            }}
          />
        </div>
      )}
    </div>
  );
};

type ContainerProps = {
  children: ({ numCols }: { numCols: number }) => React.ReactNode;
};
const Container = ({ children }: ContainerProps) => {
  const { numCols } = useContext(InfiniteScrollContext);

  return (
    <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-5 gap-y-6">
      {children({ numCols })}
    </div>
  );
};

type InfiniteScrollProps = {
  children: ({
    mutatePage: resetPage,
  }: {
    mutatePage: React.Dispatch<React.SetStateAction<number>>;
  }) => React.ReactNode;
  paginationHandler: (
    page: number
  ) => (dispatch: React.Dispatch<any>) => Promise<void>;
  isLoading: boolean;
};

const InfiniteScroll = ({
  children,
  paginationHandler,
  isLoading,
}: InfiniteScrollProps) => {
  const { isSmall, isLarge } = useTailwindMediaQuery();
  const [page, setPage] = useState(
    randomize(0, Number(PokemonGenerationsEnum.GENERATION_7) - PAGINATE_SIZE)
  );
  const [numCols, setNumCols] = useState(1);

  useEffect(() => {
    let col: number;

    if (isSmall) {
      col = 2;
    }
    if (isLarge) {
      col = 3;
    } else {
      col = 1;
    }

    setNumCols(col);
  }, [isSmall, isLarge]);

  return (
    <InfiniteScrollContext.Provider
      value={{
        page,
        setPage,
        numCols,
        setNumCols,
        isLoading,
        paginationHandler,
      }}
    >
      {children({ mutatePage: setPage })}
    </InfiniteScrollContext.Provider>
  );
};

InfiniteScroll.Container = Container;
InfiniteScroll.Button = Button;
InfiniteScroll.Waypoint = Waypoint;
export default InfiniteScroll;
