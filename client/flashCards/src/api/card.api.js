import { Api } from "./base.api";

const CARD_URL = "card/";

export function getCardsFrom(deckId) {
  return Api.get(CARD_URL, {
    params: {
      deck: deckId,
    },
  });
}

export function postCard(front, back, deckId) {
  return Api.post(CARD_URL, { front: front, back: back, deck: deckId });
}
