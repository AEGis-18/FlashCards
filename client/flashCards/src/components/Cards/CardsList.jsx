import { useEffect, useState } from "react";
import { getCardsFrom } from "../../api/card.api";
import Card from "./Card";

export default function CardsList({ deckId }) {
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
  }, []);

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
