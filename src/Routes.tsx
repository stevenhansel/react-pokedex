import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Switch, Route, BrowserRouter } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import {
  cachedPokemonsSelector,
  getCachedPokemons,
} from "./features/cachedPokemonsSlice";
import { SliceStatus } from "./globals";

const PokemonsPage = React.lazy(() => import("./pages/PokemonsPage"));

const Routes: React.FC = () => {
  const dispatch = useDispatch();
  const cachedPokemons = useSelector(cachedPokemonsSelector);

  useEffect(() => {
    dispatch(getCachedPokemons());
    //eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <React.Suspense fallback={<SplashScreen />}>
        <Switch>
          {cachedPokemons.status.state === SliceStatus.LOADING ||
          cachedPokemons.status.state === SliceStatus.IDLE ? (
            <SplashScreen />
          ) : (
            <Route path="/" component={PokemonsPage} />
          )}
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
};
export default Routes;
