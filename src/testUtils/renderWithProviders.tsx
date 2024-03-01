import React, { FunctionComponent, PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { UserStoreProvider } from "../store/userStore.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatStoreProvider } from "../store/chatStore.tsx";

const AllProviders: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    <UserStoreProvider>
      <ChatStoreProvider>{children}</ChatStoreProvider>
    </UserStoreProvider>
  </QueryClientProvider>
);

const renderWithProviders = (ui: React.ReactElement, options?: any) =>
  render(ui, { wrapper: AllProviders, ...options });

export { renderWithProviders };
