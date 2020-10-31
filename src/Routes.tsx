import React from "react";

import { Switch, Route, BrowserRouter } from "react-router-dom";

import PokemonsPage from "./pages/PokemonsPage";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={PokemonsPage} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
