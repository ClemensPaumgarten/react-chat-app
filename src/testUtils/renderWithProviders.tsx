import React, { FunctionComponent, PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "../store/store.ts";

const AllProviders: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    <Provider store={store}>{children}</Provider>
  </QueryClientProvider>
);

const renderWithProviders = (ui: React.ReactElement, options?: any) =>
  render(ui, { wrapper: AllProviders, ...options });

export { renderWithProviders };
