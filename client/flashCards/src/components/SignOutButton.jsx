import { signOut } from "../api/tokens.api";
import { useAuth } from "./AuthProvider";
import { Button } from "./formElements/Button";
import { useNavigate } from "react-router-dom";

export default function SignOutButton() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleButton = async (e) => {
    e.preventDefault();
    const res = await signOut();
    setAuth(null);
    navigate("/");
  };
  return (
    <Button variant="cancel" onClick={handleButton}>
      Sign Out
    </Button>
  );
}
