import { ErrorMessage } from "../ErrorMessage";
import { useState } from "react";
import { DefaultForm } from "../DefaultForm";
import { FormTitle } from "../formElements/FormTitle";
import { Label } from "../formElements/Label";
import { Button } from "../formElements/Button";
import { TextInput } from "../formElements/TextInput";
import { useNavigate } from "react-router";
import { postCard } from "../../api/card.api";

export function CardForm({ deckId, triggerRefresh }) {
  if (!deckId) {
    return <ErrorMessage>No deck provided</ErrorMessage>;
  }

  const [formData, setFormData] = useState({
    front: "",
    back: "",
    deckId: deckId,
  });

  //const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await postCard(
        formData.front,
        formData.back,
        formData.deckId
      );
      triggerRefresh();
      // navigate("/decks");
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <>
      <DefaultForm id="create-card" onSubmit={handleSubmit}>
        <FormTitle className="mb-3">Create deck</FormTitle>
        <div className="flex items-baseline space-x-18 w-full mb-2">
          <Label for="front" size="small" className="w-auto">
            Front:
          </Label>
          <TextInput
            id="front"
            value={formData.front}
            onChange={handleChange}
            size="small"
            className=" w-full"
          />
        </div>
        <div className="flex items-baseline space-x-2 w-full mb-2">
          <Label for="back" size="small" className=" w-auto">
            Back:
          </Label>
          <TextInput
            id="back"
            value={formData.back}
            onChange={handleChange}
            size="small"
            className="w-full"
          />
        </div>
        <div className="flex justify-center mt-4">
          <Button variant={"accept"} form="create-card" type="submit">
            Add
          </Button>
        </div>
      </DefaultForm>
    </>
  );
}
