import { Api } from "./base.api";

const CARD_URL = "card/";
const GET_FLASH_CARD_URL = "get-flash-cards/";
const RETURN_FLASH_CARD_URL = "return-flash-cards/";

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

export function returnFlashCards(cards) {
  return Api.post("return-flash-cards/", {
    cards: cards,
  });
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
