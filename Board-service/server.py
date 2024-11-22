from flask import Flask
from routes import register_routes  # Poprawny import funkcji
from flask_cors import CORS
from config import Config

def create_app():
    """Tworzenie instancji aplikacji Flask"""
    app = Flask(__name__)
    CORS(app, origins=Config.CORS, supports_credentials=True)
    # Rejestracja tras (endpoints)
    register_routes(app)

    return app

# Uruchomienie aplikacji
if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5001)
