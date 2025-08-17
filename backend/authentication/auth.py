from rest_framework_simplejwt.authentication import JWTAuthentication


class CookiesJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        bearer = request.headers.get("Authorization")
        # if not bearer:
        #    return None
        
        access_token = bearer.split(" ")[1]

        if not access_token:
            return None

        validated_token = self.get_validated_token(access_token)

        try:
            user = self.get_user(validated_token)
        except:
            return None

        return (user, validated_token)
