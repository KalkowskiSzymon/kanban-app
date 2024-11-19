from pymongo import MongoClient
from config import Config

def get_db_connection():
    """Funkcja do uzyskania połączenia z MongoDB"""
    mongo_uri = Config.MONGO_URI
    if mongo_uri is None:
        raise ValueError("Mongo URI not found in environment variables.")
    client = MongoClient(mongo_uri)
    return client['kanban']  # Zwracamy bazę danych 'kanban'
