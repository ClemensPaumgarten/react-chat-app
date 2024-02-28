import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../testUtils/renderWithProviders.tsx";
import { UserListContainer } from "./UserListContainer.tsx";

import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("react-query", () => ({
  useQuery: vi.fn().mockReturnValue({
    data: [
      { id: "1", username: "User 1" },
      { id: "2", username: "User 2" },
    ],
    isLoading: false,
    error: {},
  }),
}));

describe("UserlistContainer Component", () => {
  test("renders Available Users Blocks", () => {
    renderWithProviders(<UserListContainer />);

    // Verify that the "Available Users" header is rendered
    expect(screen.getByText("Available Users")).toBeInTheDocument();
  });

  test("renders userList", () => {
    renderWithProviders(<UserListContainer />);

    setTimeout(() => {
      expect(screen.getByText("User 1")).toBeInTheDocument();
    }, 40);
  });
});
