import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register } from "./pages/Register.tsx";
import { ChatPage } from "./pages/ChatPage.tsx";
import { MainRoute } from "./pages/MainRoute.tsx";

export const ChatRouter = () => {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainRoute />,
      loader: MainRoute.loader,

      children: [
        {
          path: Register.path,

          element: <Register />,
        },
        { path: ChatPage.path, element: <ChatPage /> },
      ],
    },
  ]);

  return <RouterProvider router={browserRouter} />;
};
