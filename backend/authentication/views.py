from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework import status

from .models import Note
from .serializers import (
    NoteSerializer,
    UserRegistrationSerializer,
    MyTokenObtainPairSerializer,
)


# Create your views here.
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)

            tokens = response.data
            access_token = tokens["access"]
            refresh_token = tokens["refresh"]

            access_token_info = AccessToken(access_token)

            res = Response(
                {
                    "access_token": access_token,
                    "user": {
                        "username": access_token_info["username"],
                        "email": access_token_info["email"],
                    },
                },
                status=200,
            )
            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite="None",  #!Check
            )

            return res
        except:
            return Response()


class CustomRefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get("refresh_token")
            if not refresh_token:
                return Response(
                    {"detail": "Refresh token is missing."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            request.data["refresh"] = refresh_token
            response = super().post(request, *args, **kwargs)
            tokens = response.data
            access_token = tokens["access"]
            access_token_info = AccessToken(access_token)
            res = Response(
                {
                    "access_token": access_token,
                    "user": {
                        "username": access_token_info["username"],
                        "email": access_token_info["email"],
                    },
                },
                status=200,
            )

            return res
        except InvalidToken as e:
            return Response(
                {"detail": "Invalid refresh token."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        except Exception as e:
            return Response(
                {"detail": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


@api_view(["POST"])
def logout(request):
    try:
        res = Response()
        res.data = {"success": True}
        res.delete_cookie("refresh_token", path="/", samesite="None")

        return res
    except:
        return Response({"success": False})


@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_notes(request):
    user = request.user
    notes = Note.objects.filter(owner=user)
    serializer = NoteSerializer(notes, many=True)

    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    return Response({"authenticated": True})
