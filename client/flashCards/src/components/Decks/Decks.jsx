import { useEffect, useState } from "react";
import { deleteDeck, getDecks } from "../../api/deck.api";
import { DeckBox } from "./DeckBox";

export default function Decks() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const res = await getDecks();
        // console.log(res.data);
        setDecks(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeck();
  }, []);

  const handleDelete = async (deckId) => {
    try {
      await deleteDeck(deckId);
      setDecks((prev) => prev.filter((deck) => deck.id !== deckId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ul className="flex space-x-8 text-center">
        {decks.map((deck) => {
          return (
            <li key={deck.id}>
              <DeckBox deck={deck} deckId={deck.id} onDelete={handleDelete} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
