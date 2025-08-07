import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";

interface ProtectedRouteProps {
  children: JSX.Element;
  isAuthenticated: boolean;
}

const ProtectedRoute = ({ children, isAuthenticated }: ProtectedRouteProps) => {
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;