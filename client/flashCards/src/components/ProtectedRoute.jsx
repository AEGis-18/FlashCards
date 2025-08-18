import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
  const { auth, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return children;
}
