import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { WrapReduxAsyncHandlerType } from "../features/utilities";
import useTailwindMediaQuery from "../hooks/useTailwindMediaQuery";
import LoadButton from "./LoadButton";

type Props = {
  children: ({ numCols }: { numCols: number }) => React.ReactNode;
  paginationHandler: WrapReduxAsyncHandlerType;
  isLoading: boolean;
};

const InfiniteScroll = ({ children, paginationHandler, isLoading }: Props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [numCols, setNumCols] = useState(1);
  const { isSmall, isLarge } = useTailwindMediaQuery();

  useEffect(() => {
    dispatch(paginationHandler({ page }));
  }, [dispatch, page, paginationHandler]);

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
            <LoadButton clickHandler={() => setPage((p) => p + 1)} />
          </div>
        )}
      </div>
    </div>
  );
};
export default InfiniteScroll;
