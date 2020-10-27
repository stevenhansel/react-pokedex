import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { Waypoint } from "react-waypoint";
import { WrapReduxAsyncHandlerType } from "../features/utilities";

type Props = {
  paginationHandler: WrapReduxAsyncHandlerType;
  isLoading: boolean;
};

const InfiniteScroll: React.FC<Props> = ({
  children,
  paginationHandler,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(paginationHandler({ page }));
  }, [dispatch, page, paginationHandler]);

  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-x-3 gap-y-6">
        {children}
      </div>
      <div className="py-16 mx-auto">
        {isLoading ? (
          <ScaleLoader />
        ) : (
          <div className="mt-16">
            {/* <Waypoint onEnter={() => setPage((p) => p + 1)} /> */}
          </div>
        )}
      </div>
    </div>
  );
};
export default InfiniteScroll;
