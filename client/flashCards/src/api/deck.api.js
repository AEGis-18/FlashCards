import { Api } from "./base.api";

const DECK_URL = "deck/";

export function getDecks() {
  return Api.get(DECK_URL);
}

export function postDecks(title, description, creator) {
  return Api.post(DECK_URL, {
    title: title,
    description: description,
    creator: creator,
  });
}
