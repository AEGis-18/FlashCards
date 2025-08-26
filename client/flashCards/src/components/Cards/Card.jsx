import { Box } from "../formElements/Box";
import { Button } from "../formElements/Button";
import { BiSolidEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";

export function Card({ card, onDelete, onEdit }) {
  return (
    <Box>
      <h1>{card.front}</h1>
      <p>{card.back}</p>
      <div>
        <Button size={"small"} onClick={() => onEdit(card)}>
          <BiSolidEdit></BiSolidEdit>
        </Button>
        <Button
          size={"small"}
          variant={"cancel"}
          onClick={() => onDelete(card.id)}
        >
          <BsTrash></BsTrash>
        </Button>
      </div>
    </Box>
  );
}
