from bson.objectid import ObjectId
from db import get_db_connection

class BoardModel:
    def __init__(self):
        self.db = get_db_connection()
        self.boards_collection = self.db['board']

    def get_all_boards(self, user_id):
        """
        Pobieranie wszystkich tablic dla danego użytkownika
        """
        try:
            boards = list(self.boards_collection.find({'user_id': user_id}))
            for board in boards:
                board['_id'] = str(board['_id'])  # Konwertujemy ObjectId na string
            return boards
        except Exception as e:
            print(f"Error fetching boards: {e}")
            raise
    
    def create_board(self, user_id, title, description, color):
        """
        Tworzenie nowej tablicy przypisanej do użytkownika
        """
        board = {
            'user_id': user_id,  # Używamy user_id z tokenu, a nie username
            'title': title,
            'description': description,
            'color': color,  # Poprawienie błędu składniowego - dodanie przecinka
        }
    
        # Wstawienie nowej tablicy do kolekcji 'boards' w bazie danych
        result = self.boards_collection.insert_one(board)
    
        # Dodanie ID dokumentu do słownika board
        board['_id'] = str(result.inserted_id)
    
        return board


    def update_board(self, board_id, user_id, title, description, color):
        """
        Aktualizacja tablicy, sprawdzając czy należy do danego użytkownika
        """
        updated_board = {
            'title': title,
            'description': description,
            'color': color
        }
        result = self.boards_collection.update_one(
            {'_id': ObjectId(board_id), 'user_id': user_id}, {'$set': updated_board}
        )
        if result.matched_count == 0:
            return None  # Tablica nie została znaleziona lub nie należy do użytkownika
        updated_board['_id'] = board_id
        return updated_board

    def delete_board(self, board_id, user_id):
        """
        Usuwanie tablicy, sprawdzając czy należy do danego użytkownika
        """
        result = self.boards_collection.delete_one({'_id': ObjectId(board_id), 'user_id': user_id})
        if result.deleted_count == 0:
            return None  # Tablica nie została znaleziona lub nie należy do użytkownika
        return {'message': 'Board deleted'}
