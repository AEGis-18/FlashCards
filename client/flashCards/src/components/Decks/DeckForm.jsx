import { useEffect, useState } from "react";
import { DefaultForm } from "../DefaultForm";
import { FormTitle } from "../formElements/FormTitle";
import { Label } from "../formElements/Label";
import { Button } from "../formElements/Button";
import { TextInput } from "../formElements/TextInput";
import { useLocation, useNavigate } from "react-router";
import { postDecks } from "../../api/deck.api";
import { useAuth } from "../AuthProvider";

export function DeckForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    creator: "",
  });

  const { auth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      setFormData((prev) => ({ ...prev, creator: auth.username }));
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await postDecks(
        formData.title,
        formData.description,
        formData.creator
      );

      navigate("/my-decks");
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
      <DefaultForm id="create-deck" onSubmit={handleSubmit}>
        <FormTitle className="mb-3">Create deck</FormTitle>
        <div className="flex items-baseline space-x-18 w-full mb-2">
          <Label for="title" size="small" className="w-auto">
            Title:
          </Label>
          <TextInput
            id="title"
            value={formData.title}
            onChange={handleChange}
            size="small"
            className=" w-full"
          />
        </div>
        <div className="flex items-baseline space-x-2 w-full mb-2">
          <Label for="description" size="small" className=" w-auto">
            Description:
          </Label>
          <TextInput
            id="description"
            value={formData.description}
            onChange={handleChange}
            size="small"
            className="w-full"
          />
        </div>
        <div className="flex justify-center mt-4">
          <Button variant={"accept"} form="create-deck" type="submit">
            Create
          </Button>
        </div>
      </DefaultForm>
    </>
  );
}
