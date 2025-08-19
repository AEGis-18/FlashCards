from django.urls import path
from django.conf.urls import include
from .views import DeckView, CardView, UserDeckView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"deck", DeckView, basename="deck")
router.register(r"card", CardView, basename="card")
router.register(r"user-deck", UserDeckView, basename="user-deck")

urlpatterns = [
    path("", include(router.urls)),
]
