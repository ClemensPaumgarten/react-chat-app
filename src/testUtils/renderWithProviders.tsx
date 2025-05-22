import React, { FunctionComponent, PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AllProviders: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

export const renderWithProviders = (ui: React.ReactElement, options?: any) =>
  render(ui, { wrapper: AllProviders, ...options });
