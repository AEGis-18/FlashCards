import CardsList from "../Cards/CardsList";
import { useLocation } from "react-router-dom";

export default function DeckDetail() {
  const location = useLocation();
  const { deckId } = location.state || {};
  return (
    <div>
      <CardsList deckId={deckId} />
    </div>
  );
}
