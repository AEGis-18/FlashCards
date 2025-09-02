from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes, authentication_classes
from .models import Deck, Card, UserDeck
from .serializers import DeckSerializer, CardSerializer, UserDeckSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models.signals import post_save
from rest_framework import status
from .utils import deal_cards, get_user_deck


# Create your views here.
# @authentication_classes([])
@permission_classes([IsAuthenticated])
class DeckView(viewsets.ModelViewSet):
    serializer_class = DeckSerializer
    queryset = Deck.objects.all()

    def perform_create(self, serializer):
        deck = serializer.save()
        post_save.send(sender=Deck, instance=deck, created=True, user=self.request.user)


# @authentication_classes([])
@permission_classes([IsAuthenticated])
class CardView(viewsets.ModelViewSet):
    serializer_class = CardSerializer

    def get_queryset(self):
        queryset = Card.objects.all()
        deck = self.request.query_params.get("deck")

        if deck:
            queryset = queryset.filter(deck=deck)

        return queryset


# @authentication_classes([])
@permission_classes([IsAuthenticated])
class UserDeckView(viewsets.ModelViewSet):
    serializer_class = UserDeckSerializer

    def get_queryset(self):
        queryset = UserDeck.objects.all()
        forUser = self.request.query_params.get("forUser")

        if forUser:
            queryset = queryset.filter(user=self.request.user)

        return queryset


@api_view(["POST"])
# @authentication_classes([])
@permission_classes([IsAuthenticated])
def add_deck(request):
    print(request.data)
    serializer = UserDeckSerializer()

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
# @authentication_classes([])
@permission_classes([IsAuthenticated])
def get_flash_cards(request):

    request_deck = request.query_params.get("deck")
    if not request_deck:
        return Response({"error": "Deck parameter is required."}, status=400)

    cards = Card.objects.filter(deck=request_deck).order_by("-value", "?")

    card_serializer = CardSerializer(cards, many=True)

    request_user = request.user.id
    if not request_user:
        return Response({"error": "User is needed"}, status=400)

    user_deck = get_user_deck(request_deck, request_user)
    max_cards = user_deck["max_cards"]
    min_cards = user_deck["min_cards"]

    # TODO: change to max_cards
    final_cards = deal_cards(card_serializer.data, 8, min_cards)

    return Response(final_cards, status=status.HTTP_200_OK)


@api_view(["POST"])
# @authentication_classes([])
@permission_classes([IsAuthenticated])
def return_flash_cards(request):

    cards = request.data.get("cards", [])
    updated_cards = []

    for card_data in cards:
        try:
            card = Card.objects.get(id=card_data["id"])
            card.value = card_data["value"]
            updated_cards.append(card)

        except Card.DoesNotExist:
            return Response(
                {"error": f'Card with id {card_data["id"]} does not exist'},
                status=status.HTTP_404_NOT_FOUND,
            )

    Card.objects.bulk_update(updated_cards, ["value"])
    return Response({"message": "Cards received"}, status=status.HTTP_200_OK)
