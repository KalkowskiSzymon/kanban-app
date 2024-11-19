from flask import jsonify, request
from user_model import UserModel
import re

def register_routes(app):
    """
    Registers the routes for user registration and login in the Flask application.

    This function defines two routes:
    - `/register`: Handles user registration.
    - `/login`: Handles user login and JWT token generation.
    """
    user_model = UserModel(app.config['MONGO_URI'])

    # User Registration Route
    @app.route('/register', methods=['POST'])
    def register():
        """
        Registers a new user with the provided username, password, and email.

        Validates the user input, ensuring that:
        - The username, password, and email are provided.
        - The password meets certain security criteria (at least 8 characters, 
          one uppercase letter, one number, and one special character).

        :return: A JSON response with a success or error message.
        """
        data = request.json
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')  # Adding email field

        # Check if username, password, and email are provided
        if not username or not password or not email:
            return jsonify({'error': 'Username, password, and email are required'}), 400

        # Validate the password using regex
        password_pattern = r'^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
        if not re.match(password_pattern, password):
            return jsonify({'error': 'Password must be at least 8 characters long, '
                                       'contain one uppercase letter, one number, and one special character'}), 400
        
        # Register the user in the database
        user_id = user_model.register_user(username, password, email)
        if not user_id:
            return jsonify({'error': 'Username or email already exists'}), 400
        
        return jsonify({'message': 'User registered successfully'}), 201

    # User Login Route
    @app.route('/login', methods=['POST'])
    def login():
        """
        Logs in a user and returns a JWT token if credentials are valid.

        Validates the user credentials and generates a JWT token for successful login.

        :return: A JSON response with a JWT token or an error message if credentials are invalid.
        """
        data = request.json
        username = data.get('username')
        password = data.get('password')

        # Check if username and password are provided
        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400

        # Attempt to log the user in and generate a JWT token
        token = user_model.login_user(username, password)
        if not token:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        return jsonify({'token': token}), 200
