import { FunctionComponent, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register } from "../../pages/Register.tsx";
import { ChatPage } from "../../pages/ChatPage.tsx";
import { MainRoute } from "../../pages/MainRoute.tsx";

export const ChatRouter: FunctionComponent = () => {
  const browserRouter = useMemo(() => {
    return createBrowserRouter([
      {
        element: <MainRoute />,
        path: MainRoute.path,
        loader: MainRoute.loader,
        children: [
          {
            path: Register.path,
            action: Register.action,
            element: <Register />,
          },
          {
            path: ChatPage.path,
            element: <ChatPage />,
            loader: ChatPage.loader,
          },
        ],
      },
    ]);
  }, []);

  return <RouterProvider router={browserRouter} />;
};
