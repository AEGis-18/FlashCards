from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Deck, UserDeck
from django.contrib.auth.models import User


@receiver(post_save, sender=Deck)
def create_user_deck(sender, instance, created, **kwargs):
    if created:
        user = kwargs.get("user")
        if user:
            UserDeck.objects.create(user=user, deck=instance)
