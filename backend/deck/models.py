from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Deck(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    creator = models.CharField(max_length=100)


class Card(models.Model):
    front = models.CharField(max_length=150)
    back = models.CharField(max_length=150)
    value = models.IntegerField(default=0)
    deck = models.ForeignKey(Deck, null=False, blank=False, on_delete=models.CASCADE)


class UserDeck(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE)
    # TODO max>min
    max_cards = models.PositiveIntegerField(default=50)
    min_cards = models.PositiveIntegerField(default=0)
