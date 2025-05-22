import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register } from "./pages/Register.tsx";
import { Chatroom } from "./pages/Chatroom.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.tsx";
import { MainLayout } from "./components/MainLayout/MainLayout.tsx";
import { Settings } from "./pages/Settings.tsx";

export const ChatRouter = () => {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),

      children: [
        { index: true, path: "/", element: <Chatroom /> },
        { path: "/chat", element: <Chatroom /> },
        { path: "settings", element: <Settings /> },
      ],
    },

    {
      path: Register.path,
      element: <Register />,
    },
  ]);

  return <RouterProvider router={browserRouter} />;
};
