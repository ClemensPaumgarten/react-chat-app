import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ChatRouter } from "./ChatRouter.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={createTheme()}>
          <CssBaseline />
          <ChatRouter />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}
