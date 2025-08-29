from rest_framework import serializers
from .models import Deck, Card, UserDeck
from django.contrib.auth.models import User


class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = ["id", "title", "description", "creator"]


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ["id", "front", "back", "deck", "value"]


class UserDeckSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    deck = DeckSerializer()

    class Meta:
        model = UserDeck
        fields = [
            "id",
            "user",
            "deck",
            "max_cards",
            "min_cards",
            "username",
        ]
        read_only_fieds = ["username"]

    def get_username(self, obj):
        username = obj.user.username
        return username
