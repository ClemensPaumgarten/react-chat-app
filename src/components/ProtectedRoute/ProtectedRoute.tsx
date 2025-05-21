import { FunctionComponent, PropsWithChildren } from "react";
import { useAuth } from "../../store/useAuth.tsx";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
      />
    );
  }

  return children;
};
