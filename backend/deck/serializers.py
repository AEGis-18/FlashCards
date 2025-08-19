from rest_framework import serializers
from .models import Deck, Card, UserDeck


class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = "__all__"


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ["front", "back", "deck"]


class UserDeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDeck
        fields = "__all__"
