import { BsTrash } from "react-icons/bs";
import { Box } from "../formElements/Box";
import { Button } from "../formElements/Button";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

export function DeckBox({ deck, deckId, onDelete }) {
  const navigate = useNavigate();

  function handleButton(e) {
    e.preventDefault();
    console.log("deckbox id: ", deck.id);
    return navigate(`/decks/${deck.id}`, { state: { deckId } });
  }

  return (
    <Box>
      <h1>{deck.title}</h1>
      <p>{deck.description}</p>
      <Button size={"small"} onClick={handleButton}>
        <FaEdit></FaEdit>
      </Button>
      <Button
        size={"small"}
        variant={"cancel"}
        onClick={() => onDelete(deckId)}
      >
        <BsTrash></BsTrash>
      </Button>
    </Box>
  );
}
