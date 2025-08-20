import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import NavBar from "./NavBar";

export default function ProtectedRoute({ navBar = true, children }) {
  const { auth, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {navBar && <NavBar />}
      {children}
    </>
  );
}
