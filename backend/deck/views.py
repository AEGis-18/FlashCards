from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes, authentication_classes
from .models import Deck, Card, UserDeck
from .serializers import DeckSerializer, CardSerializer, UserDeckSerializer
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models.signals import post_save


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


@authentication_classes([])
@permission_classes([AllowAny])
class UserDeckView(viewsets.ModelViewSet):
    serializer_class = UserDeckSerializer
    queryset = UserDeck.objects.all()
