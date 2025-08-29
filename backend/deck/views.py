from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes, authentication_classes, action
from .models import Deck, Card, UserDeck
from .serializers import DeckSerializer, CardSerializer, UserDeckSerializer
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models.signals import post_save
from rest_framework import status


def get_user_deck(deck, user):
    try:
        user_deck = UserDeck.objects.get(deck=deck, user=user)
    except UserDeck.DoesNotExist:
        return Response(
            {"error": "User does not have access to this deck."}, status=404
        )

    return UserDeckSerializer(user_deck).data


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

    cards = Card.objects.filter(deck=request_deck).order_by("-value")
    card_serializer = CardSerializer(cards, many=True)

    request_user = request.user.id
    if not request_user:
        return Response({"error": "User is needed"}, status=400)

    user_deck = get_user_deck(request_deck, request_user)
    max_cards = user_deck["max_cards"]
    min_cards = user_deck["min_cards"]

    final_cards = deal_cards(card_serializer.data, 5, min_cards)

    return Response(final_cards, status=status.HTTP_200_OK)


def deal_cards(full_pack, max_cards, min_cards):
    i = 0
    new_pack = []

    while len(new_pack) < min_cards or len(new_pack) < max_cards:
        if i >= len(full_pack):
            break
        new_pack.append(full_pack[i])
        i += 1

    return new_pack


@api_view(["POST"])
# @authentication_classes([])
@permission_classes([IsAuthenticated])
def return_flash_cards(request):
    pass
