import { useEffect, useState } from "react";
import { getUserDecks } from "../../api/deck.api";
import StartDeck from "./StartDeck";

export default function DisplayFlashDecks() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
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
    fetchDecks();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <ul className="flex space-x-8 text-center">
        {decks.map((deck) => {
          return (
            <li key={deck.id}>
              <StartDeck deck={deck}></StartDeck>
            </li>
          );
        })}
      </ul>
    </>
  );
}
