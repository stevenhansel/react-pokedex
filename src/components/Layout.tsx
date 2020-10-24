import React from "react";
import { Helmet } from "react-helmet";

type Props = {
  title?: string;
};

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <div>
      <Helmet>
        <title>React Pokedex {title && `| ${title}`}</title>
      </Helmet>

      {children}
    </div>
  );
};
export default Layout;
