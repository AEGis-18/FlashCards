import { Box } from "../components/formElements/Box";
import { Button } from "../components/formElements/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

export function TestPage() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  console.log("/ page", auth);
  return (
    <>
      <Box>
        <h1>Prueba</h1>
        <p>{auth.username}</p>
        <p>{auth.email}</p>
        <Button onClick={() => navigate("/notes")}>Notes</Button>
      </Box>
    </>
  );
}
