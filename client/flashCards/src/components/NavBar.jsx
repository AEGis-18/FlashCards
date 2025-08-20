import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import { useAuth } from "./AuthProvider";

export default function NavBar() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!auth) {
    return <Navigate to="/login" />;
  }
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link to="/decks">Decks</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        {auth && (
          <li>
            <SignOutButton />
          </li>
        )}
      </ul>
    </nav>
  );
}
