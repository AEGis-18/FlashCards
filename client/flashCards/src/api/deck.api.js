import { Api } from "./base.api";

const DECK_URL = "deck/";

export function getDecks() {
  return Api.get(DECK_URL);
}
