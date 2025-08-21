import { Link, Navigate } from "react-router-dom";
import { SignOutButton } from "./Buttons/SignOutButton";
import { useAuth } from "./AuthProvider";
import { LogInButton } from "./Buttons/LogInButton";

export default function NavBar() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  /* if (!auth) {
    return <Navigate to="/login" />;
  }*/

  return (
    <nav className="bg-blue-400 h-16 mb-2">
      <ul className="flex items-center h-full space-x-4 px-4">
        <li className="border-r border-white h-full pr-4 flex items-center">
          <Link to="/" className="text-white">
            Home
          </Link>
        </li>
        <li className="border-r border-white h-full pr-4 flex items-center">
          <Link to="/decks" className="text-white">
            Decks
          </Link>
        </li>
        {auth ? (
          <li className="ml-auto">
            <SignOutButton size="small" />
          </li>
        ) : (
          <li className="ml-auto">
            <LogInButton size="small" />
          </li>
        )}
      </ul>
    </nav>
  );
}
