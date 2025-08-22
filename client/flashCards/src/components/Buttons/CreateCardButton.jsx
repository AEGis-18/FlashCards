import { useState } from "react";
import { CardForm } from "../Cards/CardForm";
import { Button } from "../formElements/Button";

export function CreateCardButton({ deckId, triggerRefresh }) {
  const [showForm, setShowForm] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    setShowForm(true);
  }

  return (
    <>
      {!showForm ? (
        <Button variant={"accept"} onClick={handleClick}>
          Add card
        </Button>
      ) : (
        <CardForm deckId={deckId} triggerRefresh={triggerRefresh}></CardForm>
      )}
    </>
  );
}
