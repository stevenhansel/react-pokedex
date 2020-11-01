import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import {
  cachedPokemonsSelector,
  getCachedPokemons,
} from "./features/cachedPokemonsSlice";

import { SliceStatus } from "./globals";
import Routes from "./Routes";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const cachedPokemons = useSelector(cachedPokemonsSelector);

  useEffect(() => {
    dispatch(getCachedPokemons());
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {cachedPokemons.status.state === SliceStatus.LOADING ||
      cachedPokemons.status.state === SliceStatus.IDLE ? (
        <SplashScreen />
      ) : (
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
