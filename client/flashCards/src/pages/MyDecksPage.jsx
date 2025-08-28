import { CreateDeckButton } from "../components/Buttons/CreateDeckButton";
import { useEffect } from "react";
import { Box } from "../components/formElements/Box";
import { MyDecks } from "../components/Decks/MyDecks";

export function MyDecksPage() {
  useEffect(() => {
    document.title = "Decks - Flash Cards";
  }, []);

  return (
    <>
      <CreateDeckButton />
      <Box className="m-4">
        <MyDecks />
      </Box>
    </>
  );
}
