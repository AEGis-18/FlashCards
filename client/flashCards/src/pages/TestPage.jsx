import { Box } from "../components/formElements/Box";
import { Button } from "../components/formElements/Button";
import { FormTitle } from "../components/formElements/FormTitle";
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
        <FormTitle>Prueba</FormTitle>
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
