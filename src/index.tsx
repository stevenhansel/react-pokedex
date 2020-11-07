import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./features/store";

ReactDOM.render(
  <React.StrictMode>
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
        <App />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
