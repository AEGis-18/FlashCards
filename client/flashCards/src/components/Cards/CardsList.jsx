import { useEffect, useState } from "react";
import { getCardsFrom } from "../../api/card.api";
import { Card } from "./Card";

export function CardsList({ deckId, refresh }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        console.log("deck id: ", deckId);
        const res = await getCardsFrom(deckId);
        console.log(res.data);
        setCards(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [deckId, refresh]);

  return (
    <>
      <ul>
        {cards.map((card) => {
          return (
            <li key={card.id}>
              <Card card={card}></Card>
            </li>
          );
        })}
      </ul>
    </>
  );
}
