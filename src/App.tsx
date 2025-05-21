import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatRouter } from "./ChatRouter.tsx";

const queryClient = new QueryClient();

export function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ChatRouter />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
