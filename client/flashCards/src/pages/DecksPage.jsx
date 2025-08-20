import Decks from "../components/Decks/Decks";
import { useEffect } from "react";

export default function DecksPage() {
  useEffect(() => {
    document.title = "Decks - Flash Cards";
  }, []);

  return <Decks></Decks>;
}
