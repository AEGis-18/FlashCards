import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { Box } from "../formElements/Box";
import { Button } from "../formElements/Button";

export default function StartDeck({ deck }) {
  const navigate = useNavigate();

  function handleButton(e) {
    e.preventDefault();
    return navigate(`/flash-cards/${deck.id}`);
  }

  return (
    <Box>
      <h1>{deck.title}</h1>
      <p>{deck.description}</p>
      <Button size={"small"} onClick={handleButton}>
        <FaPlay></FaPlay>
      </Button>
    </Box>
  );
}
