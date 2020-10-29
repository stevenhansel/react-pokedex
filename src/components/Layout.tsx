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
        <title>React Pokédex {title && `| ${title}`}</title>
        <meta
          name="description"
          content="a simple pokédex for your pokemon needs."
        />
      </Helmet>
      <Navbar />
      {children}
    </div>
  );
};
export default Layout;
