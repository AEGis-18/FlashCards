import { useAuth } from "../AuthProvider";
import { Button } from "../formElements/Button";
import { useNavigate } from "react-router-dom";

export function LogInButton({ size }) {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleButton = async (e) => {
    e.preventDefault();
    setAuth(null);
    navigate("/login");
  };
  return (
    <Button
      variant="accept"
      className={"border-white"}
      size={size}
      onClick={handleButton}
    >
      Login
    </Button>
  );
}
