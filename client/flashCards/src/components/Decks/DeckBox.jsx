import { Box } from "../formElements/Box";
import { Button } from "../formElements/Button";
import { useNavigate } from "react-router-dom";

export function DeckBox({ title, description, deckId }) {
  const navigate = useNavigate();

  function handleButton(e) {
    e.preventDefault();
    console.log("deckbox id: ", deckId);
    return navigate(`/decks/${deckId}`, { state: { deckId } });
  }

  return (
    <Box>
      <h1>{title}</h1>
      <p>{description}</p>
      <Button onClick={handleButton}>Details</Button>
    </Box>
  );
}
