import Decks from "../components/Decks/Decks";
import { CreateDeckButton } from "../components/Buttons/CreateDeckButton";
import { useEffect } from "react";
import { Box } from "../components/formElements/Box";

export default function DecksPage() {
  useEffect(() => {
    document.title = "Decks - Flash Cards";
  }, []);

  return (
    <>
      <CreateDeckButton />
      <Box className="m-4">
        <Decks />
      </Box>
    </>
  );
}
