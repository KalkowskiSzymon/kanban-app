# routes.py
from flask import request, jsonify
from functools import wraps
from utils import decode_token
from board_handler import BoardModel
from validate_board import BoardValidator 

# Middleware do autoryzacji - weryfikuje token
def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        
        # Sprawdzamy, czy token jest w nagłówku Authorization
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].replace('Bearer ', '')
        
        if not token:
            return jsonify({'error': 'Token is missing!'}), 401
        
        # Dekodowanie tokenu
        payload = decode_token(token)
        if not payload:
            return jsonify({'error': 'Invalid or expired token'}), 403
        
        
        # Dodajemy user_id do requesta
        request.user_id = payload.get('user_id')
        return f(*args, **kwargs)

    return decorated_function

# Endpoint do tworzenia tablicy
def register_routes(app):
    @app.route('/create-board', methods=['POST'])
    @token_required
    def create_board():
        try:
            data = request.get_json()
            user_id = request.user_id  # Pobieramy userId z requesta (po weryfikacji tokenu)
            title = data.get('title')
            description = data.get('description')
            color = data.get('color')
            
            error_message, valid = BoardValidator.validate_board_data(user_id, title, description, color)
            if not valid:
                return jsonify({"error": error_message}), 400
            
            board_model = BoardModel()
            board = board_model.create_board(user_id, title, description, color)
            return jsonify({"message": "Tablica została stworzona", "board": board}), 201

        except Exception as e:
            return jsonify({"error": str(e)}), 500