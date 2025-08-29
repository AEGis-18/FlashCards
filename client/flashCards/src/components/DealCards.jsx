import { useEffect, useState } from "react";
import { getFlashCards } from "../api/card.api";
import { DisplayFlashCard } from "./DisplayFlashCard";
import { useNavigate } from "react-router-dom";

//TODO delete deckId=1
export function DealCards({ deckId = 1 }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCard, setCurrentCard] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const res = await getFlashCards(deckId);
        console.log(res.data);
        setCards(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeck();
  }, []);

  function assignValues(cardId, difficulty) {
    const difficultyChange = {
      vd: 4,
      d: 1,
      e: -1,
      ve: 0,
    };
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === cardId) {
          let newValue;
          if (difficulty === "vd" || difficulty === "ve") {
            newValue = difficultyChange[difficulty];
          } else {
            newValue = card.value + difficultyChange[difficulty];
          }
          newValue = Math.max(0, Math.min(4, newValue));

          return { ...card, value: newValue };
        }
        return card;
      })
    );
    goToNextCard();
  }

  function goToNextCard() {
    if (currentCard < cards.length - 1) {
      setCurrentCard((prev) => prev + 1);
    } else {
      console.log("end");
      console.log(cards);
    }
  }

  return (
    <>
      <h2 className="">
        {currentCard + 1} of {cards.length}
      </h2>
      <ul className="flex space-x-8 text-center">
        {cards.length > 0 && (
          <li key={cards[currentCard].id}>
            <DisplayFlashCard
              card={cards[currentCard]}
              handleClick={assignValues}
            ></DisplayFlashCard>
          </li>
        )}
      </ul>
      {/* <div>
        <Button onClick={goToNextCard}>Next card</Button>
      </div> */}
    </>
  );
}
