import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>React Pokédex {title && `| ${title}`}</title>
        <meta
          name="description"
          content="a simple pokédex for your pokemon needs."
        />
      </Helmet>
      <Navbar />
      <div className="px-2 md:px-24 lg:px-64 pt-24">{children}</div>
    </>
  );
};
export default Layout;
