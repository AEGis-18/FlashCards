import { useNavigate } from "react-router-dom";
import { Button } from "../formElements/Button";

export function CreateDeckButton() {
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    return navigate("/decks/create");
  }
  return (
    <Button variant={"accept"} onClick={handleClick}>
      + Create deck
    </Button>
  );
}
