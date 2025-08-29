import { Api } from "./base.api";

const CARD_URL = "card/";

export function getCardsFrom(deckId) {
  return Api.get(CARD_URL, {
    params: {
      deck: deckId,
    },
  });
}

export function getFlashCards(deckId) {
  return Api.get("get-flash-cards/", { params: { deck: deckId } });
}

export function postCard(front, back, deckId) {
  return Api.post(CARD_URL, { front: front, back: back, deck: deckId });
}

export function deleteCard(id) {
  return Api.delete(`${CARD_URL}${id}/`);
}

export function updateCard(id, front, back) {
  return Api.patch(`${CARD_URL}${id}/`, { front: front, back: back });
}
