import { useEffect, useState } from "react";
import { getDecks } from "../../api/deck.api";
import { PublicDeckBox } from "./PublicDeckBox";

export function PublicDecks() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const res = await getDecks();
        setDecks(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeck();
  }, []);

  return (
    <>
      <ul className="flex space-x-8 text-center">
        {decks.map((deck) => {
          return (
            <li key={deck.id}>
              <PublicDeckBox deck={deck} deckId={deck.id} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
