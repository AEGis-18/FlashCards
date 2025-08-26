import { useEffect, useState } from "react";
import { deleteCard, getCardsFrom } from "../../api/card.api";
import { Card } from "./Card";
import { CardForm } from "./CardForm";

export function CardsList({ deckId, refresh }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        //console.log("deck id: ", deckId);
        const res = await getCardsFrom(deckId);
        // console.log(res.data);
        setCards(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [deckId, refresh]);

  const handleDelete = async (cardId) => {
    try {
      await deleteCard(cardId);
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.log(error);
    }
  };

  function handleEditClick(card) {
    setEditingCard(card);
  }

  function handleUpdate(updatedCard) {
    setCards((prev) =>
      prev.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
    setEditingCard(null);
  }

  return (
    <>
      <ul>
        {cards.map((card) => {
          if (editingCard?.id === card.id) {
            return (
              <li key={card.id}>
                <CardForm
                  deckId={deckId}
                  initialCard={card}
                  triggerRefresh={refresh}
                  onUpdate={handleUpdate}
                />
              </li>
            );
          }
          return (
            <li key={card.id}>
              <Card
                card={card}
                onDelete={handleDelete}
                onEdit={handleEditClick}
              ></Card>
            </li>
          );
        })}
      </ul>
    </>
  );
}
