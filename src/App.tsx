import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./features/store";
import Routes from "./Routes";

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>React Pokédex</title>
        <meta
          name="description"
          content="a simple pokédex for your pokemon needs."
        />
      </Helmet>
      <Provider store={store}>
        <Routes />
      </Provider>
    </HelmetProvider>
  );
};

export default App;
