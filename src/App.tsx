import { ChatStoreProvider } from "./store/chatStore.tsx";
import { UserStoreProvider } from "./store/userStore.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ChatRouter } from "./components/ChatRouter/ChatRouter.tsx";

export function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <UserStoreProvider>
        <ChatStoreProvider>
          <ChatRouter />
        </ChatStoreProvider>
      </UserStoreProvider>
    </ThemeProvider>
  );
}
