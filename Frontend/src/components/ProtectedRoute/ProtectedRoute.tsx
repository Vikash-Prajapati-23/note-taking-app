// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
