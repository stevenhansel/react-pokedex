import React, { useState, useContext, createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons, PAGINATE_SIZE } from "../features/pokemonSlice";
import LoadButton from "./LoadButton";
import { Waypoint as ReactWaypoint } from "react-waypoint";

type ContextType = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  paginationHandler: (
    page: number
  ) => (dispatch: React.Dispatch<any>) => Promise<void>;
  data: any[];
};
const InfiniteScrollContext = createContext<ContextType>({
  page: 0,
  setPage: () => {},
  isLoading: true,
  paginationHandler: getPokemons,
  data: [],
});

const Waypoint = () => {
  const { isLoading, setPage, page, paginationHandler, data } = useContext(
    InfiniteScrollContext
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setPage(data.length - (data.length % 6));
    //eslint-disable-next-line
  }, []);

  return (
    <div className="mt-48">
      {!isLoading && (
        <ReactWaypoint
          onEnter={() => {
            const dispatchPage = page + (data.length > page ? 6 : 0);
            setPage(dispatchPage);
            dispatch(paginationHandler(dispatchPage));
          }}
        />
      )}
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
  children: React.ReactNode;
};
const Container = ({ children }: ContainerProps) => {
  return (
    <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-5 gap-y-6">
      {children}
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
  data: any[];
};

const InfiniteScroll = ({
  children,
  paginationHandler,
  isLoading,
  data,
}: InfiniteScrollProps) => {
  const [page, setPage] = useState<number>(0);

  return (
    <InfiniteScrollContext.Provider
      value={{
        page,
        setPage,
        isLoading,
        paginationHandler,
        data,
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
