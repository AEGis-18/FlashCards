from rest_framework.response import Response
from .models import UserDeck
from .serializers import UserDeckSerializer


def get_user_deck(deck, user):
    try:
        user_deck = UserDeck.objects.get(deck=deck, user=user)
    except UserDeck.DoesNotExist:
        return Response(
            {"error": "User does not have access to this deck."}, status=404
        )

    return UserDeckSerializer(user_deck).data


def deal_cards(full_pack, max_cards, min_cards):
    i = 0
    new_pack = []

    while len(new_pack) < min_cards or len(new_pack) < max_cards:
        if i >= len(full_pack):
            break
        new_pack.append(full_pack[i])
        i += 1

    return new_pack
