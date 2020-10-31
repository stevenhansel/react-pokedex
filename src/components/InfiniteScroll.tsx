import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { PAGINATE_SIZE } from "../features/pokemonSlice";
import useTailwindMediaQuery from "../hooks/useTailwindMediaQuery";
import { randomize } from "../utils/randomize";
import LoadButton from "./LoadButton";
import { PokemonGenerationsEnum } from "../features/cachedPokemonsSlice";

type Props = {
  children: ({ numCols }: { numCols: number }) => React.ReactNode;
  paginationHandler: (
    page: number
  ) => (dispatch: React.Dispatch<any>) => Promise<void>;
  isLoading: boolean;
};

const InfiniteScroll = ({ children, paginationHandler, isLoading }: Props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(
    randomize(0, PokemonGenerationsEnum.GENERATION_7 - PAGINATE_SIZE)
  );
  const [numCols, setNumCols] = useState(1);
  const { isSmall, isLarge } = useTailwindMediaQuery();

  useEffect(() => {
    /** Initialize First Pokemon List */
    dispatch(paginationHandler(page));

    //eslint-disable-next-line
  }, [page]);

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
    <div>
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6">
        {children({ numCols })}
      </div>
      <div className="py-16 mx-auto">
        {isLoading ? (
          <ScaleLoader color="#E3350D" />
        ) : (
          <div className="mt-16">
            <LoadButton
              clickHandler={() => {
                setPage(page + PAGINATE_SIZE);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default InfiniteScroll;
