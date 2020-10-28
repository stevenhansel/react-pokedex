import React from "react";

import { Switch, Route, BrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
