import { useParams } from "react-router-dom";
import { DealCards } from "../components/FlashCards/DealCards";

export function FlashCardsPage() {
  const { id } = useParams();
  return (
    <>
      <DealCards deckId={id} />
    </>
  );
}
