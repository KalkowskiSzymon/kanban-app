from authlib.jose import jwt
from authlib.jose.errors import BadSignatureError, JoseError  # Zmienione na JoseError
from config import Config

def decode_token(token):
    try:
        secret_key = Config.SECRET_KEY
        payload = jwt.decode(token, secret_key)
        payload.validate()  # Sprawdzenie, czy token jest ważny
        
        # Logowanie zawartości tokenu (dzięki temu zobaczysz, czy userId jest w tokenie)
        
        return payload  # Zwróć dane z tokenu
    except BadSignatureError:
        print("Invalid token signature")
        return None  # Token ma nieprawidłowy podpis
    except JoseError as e:
        print(f"Error with token: {e}")
        return None  # Ogólny błąd związany z tokenem