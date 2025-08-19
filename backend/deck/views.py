from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes, authentication_classes
from .models import Deck, Card, UserDeck
from .serializers import DeckSerializer, CardSerializer, UserDeckSerializer


# Create your views here.
@authentication_classes([])
@permission_classes([AllowAny])
class DeckView(viewsets.ModelViewSet):
    serializer_class = DeckSerializer
    queryset = Deck.objects.all()


@authentication_classes([])
@permission_classes([AllowAny])
class CardView(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    queryset = Card.objects.all()


@authentication_classes([])
@permission_classes([AllowAny])
class UserDeckView(viewsets.ModelViewSet):
    serializer_class = UserDeckSerializer
    queryset = UserDeck.objects.all()
