import { Box } from "../components/formElements/Box";
import { Button } from "../components/formElements/Button";
import { useNavigate } from "react-router-dom";

export function TestPage() {
  const navigate = useNavigate();

  return (
    <>
      <Box>
        <h1>Prueba</h1>

        <Button onClick={() => navigate("/notes")}>Notes</Button>
      </Box>
    </>
  );
}
