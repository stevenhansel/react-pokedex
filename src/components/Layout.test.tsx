import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Layout from "./Layout";
import { HelmetProvider } from "react-helmet-async";

describe("Layout Wrapper Component", () => {
  let container: RenderResult;

  beforeEach(() => {
    container = render(
      <HelmetProvider>
        <Layout title="React Pokedex">
          <div data-testid="test-children">Children Component</div>
        </Layout>
      </HelmetProvider>
    );
  });

  it("should be able to render without any errors", async () => {
    expect(container.getByTestId("layout")).toBeInTheDocument();
    expect(container.getByTestId("navbar")).toBeInTheDocument();
    expect(container.getByTestId("test-children")).toBeInTheDocument();
  });
});
