import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";

type Props = {
  title?: string;
};

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <div>
      <Helmet>
        <title>React Pokedex {title && `| ${title}`}</title>
      </Helmet>
      <Navbar />
      {children}
    </div>
  );
};
export default Layout;
