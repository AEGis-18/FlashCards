import { CreateDeckButton } from "../components/Buttons/CreateDeckButton";
import { useEffect } from "react";
import { Box } from "../components/formElements/Box";
import { PublicDecks } from "../components/Decks/PublicDecks";

export function PublicDecksPage() {
  useEffect(() => {
    document.title = "Public Decks - Flash Cards";
  }, []);

  return (
    <>
      <CreateDeckButton />
      <Box className="m-4">
        <PublicDecks />
      </Box>
    </>
  );
}
