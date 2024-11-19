import os
from dotenv import load_dotenv

# Ładowanie zmiennych środowiskowych z pliku .env
load_dotenv()

class Config:
    MONGO_URI = os.getenv("MONGO_URI")  # Pobieramy URI z pliku .env