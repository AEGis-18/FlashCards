import { Box } from "../formElements/Box";
import { Button } from "../formElements/Button";
import { useNavigate } from "react-router-dom";

export function PublicDeckBox({ deck, deckId }) {
  return (
    <Box>
      <h1>{deck.title}</h1>
      <p>{deck.description}</p>
      <p>Creator: {deck.creator}</p>
      <Button>Add</Button>
    </Box>
  );
}
