import React, { FunctionComponent, PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { UserStoreProvider } from "../store/userStore.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Assuming you are using MUI, adjust accordingly

const AllProviders: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    <UserStoreProvider>{children}</UserStoreProvider>
  </QueryClientProvider>
);

const renderWithProviders = (ui: React.ReactElement, options?: any) =>
  render(ui, { wrapper: AllProviders, ...options });

export { renderWithProviders };
