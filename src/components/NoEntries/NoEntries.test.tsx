import "@testing-library/jest-dom";

import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../testUtils/renderWithProviders.tsx";
import { NoEntries } from "./NoEntries.tsx";

describe("NoEntries Component", () => {
  test("renders NoEntries component", () => {
    renderWithProviders(<NoEntries label="No entries" />);

    expect(screen.getByText("No entries")).toBeInTheDocument();
  });
});
