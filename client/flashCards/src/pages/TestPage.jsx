import { Box } from "../components/formElements/Box";
import { Button } from "../components/formElements/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
import { useEffect } from "react";

export function TestPage() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    document.title = "Test 1 - Flash Cards";
  }, []);

  return (
    <>
      <Box>
        <h1>Prueba</h1>
        {auth ? (
          <>
            <p>{auth.username}</p>
            <p>{auth.email}</p>
          </>
        ) : (
          <p>Login to see info</p>
        )}

        <Button onClick={() => navigate("/notes")}>Notes</Button>
        <br></br>
        <Button onClick={() => navigate("/decks")}>Decks</Button>
      </Box>
    </>
  );
}
