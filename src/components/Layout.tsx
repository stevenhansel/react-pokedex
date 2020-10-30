import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const Layout = ({ children, title }: Props) => {
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
