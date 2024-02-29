import { ChatStoreProvider } from "./store/chatStore.tsx";
import { UserStoreProvider } from "./store/userStore.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ChatRouter } from "./ChatRouter.tsx";

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={createTheme()}>
        <CssBaseline />
        <UserStoreProvider>
          <ChatStoreProvider>
            <ChatRouter />
          </ChatStoreProvider>
        </UserStoreProvider>
      </ThemeProvider>
    </Provider>
  );
}
