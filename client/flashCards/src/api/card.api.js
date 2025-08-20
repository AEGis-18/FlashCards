import { Api } from "./base.api";

const CARD_URL = "card/";

export function getCardsFrom(deckId) {
  return Api.get(CARD_URL, {
    params: {
      deck: deckId,
    },
  });
}
