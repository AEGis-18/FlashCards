import { useEffect, useState } from "react";
import { deleteDeck, getUserDecks } from "../../api/deck.api";
import { MyDeckBox } from "./MyDeckBox";
import { useAuth } from "../AuthProvider";

export function MyDecks() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const res = await getUserDecks();
        const decks = res.data.map((item) => item.deck);
        setDecks(decks);
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
              <MyDeckBox deck={deck} deckId={deck.id} onDelete={handleDelete} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
