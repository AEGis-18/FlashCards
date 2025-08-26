import { useState } from "react";
import { CreateCardButton } from "../Buttons/CreateCardButton";
import { CardsList } from "../Cards/CardsList";
import { useLocation } from "react-router-dom";

export default function DeckDetail() {
  const location = useLocation();
  const { deckId } = location.state || {};

  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh((prev) => !prev);

  return (
    <div>
      <CreateCardButton deckId={deckId} triggerRefresh={triggerRefresh} />
      <CardsList deckId={deckId} refresh={refresh} />
    </div>
  );
}
