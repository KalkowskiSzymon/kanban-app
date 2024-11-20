from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from authlib.jose import JsonWebToken
import datetime
import base64
import os

class UserModel:
    def __init__(self, db_uri):
        """
        Initializes the UserModel with a MongoDB client, bcrypt, and JWT handler.

        :param db_uri: URI of the MongoDB database.
        """
        self.client = MongoClient(db_uri)
        self.db = self.client['kanban']
        self.users_collection = self.db['users']
        self.bcrypt = Bcrypt()
        self.jwt = JsonWebToken({'alg': 'HS256'})  # Initialize Authlib JWT
        self.secret_key = 'mysecretkey'  # Secret key for signing JWTs

    def register_user(self, username, password, email, role='user'):
        """
        Registers a new user in the database.
        
        This function checks if the username or email already exists. If not,
        it generates a salted password, hashes it, and stores the user with 
        the given details in the database.

        :param username: The username for the new user.
        :param password: The password for the new user.
        :param email: The email address for the new user.
        :param role: The role of the user (default is 'user').
        :return: The user ID as a string if registration is successful, 
                 or None if the username or email already exists.
        """
        # Check if the user already exists or if the email is taken
        if self.users_collection.find_one({'username': username}) or self.users_collection.find_one({'email': email}):
            return None  # User or email already exists

        # Generate a salt for password salting
        salt = base64.b64encode(os.urandom(16)).decode('utf-8')

        # Salt and hash the password
        salted_password = password + salt
        hashed_password = self.bcrypt.generate_password_hash(salted_password).decode('utf-8')

        # Create a new user document with role and email
        user = {
            'username': username,
            'password': hashed_password,
            'email': email,
            'role': role,  # Default role assigned
            'salt': salt   # Storing the salt in the database
        }

        result = self.users_collection.insert_one(user)
        return str(result.inserted_id)

    def login_user(self, username, password):
        """
        Logs a user in and generates a JWT token if the credentials are correct.
        
        This function searches for the user by username, checks if the provided 
        password matches the stored hashed password, and returns a JWT token 
        if the login is successful.

        :param username: The username of the user trying to log in.
        :param password: The password entered by the user.
        :return: A JWT token if login is successful, or None if the username 
                 is incorrect or the password is invalid.
        """
        # Look for the user by username
        user = self.users_collection.find_one({'username': username})

        if user:
            # Retrieve the salt for the user from the database
            salt = user.get('salt', '')
            salted_password = password + salt  # Add the salt to the entered password
            if self.bcrypt.check_password_hash(user['password'], salted_password):
                # Generate a JWT token if the password is correct
                token = self.generate_jwt(user)
                return token

        return None  # Return None if the user doesn't exist or the password is incorrect

    def generate_jwt(self, user):
        """
        Generates a JWT token containing the user's ID, role, email, and expiration time.
        
        The token is signed with a secret key and includes an expiration time of 24 hours.

        :param user: A dictionary containing the user's data (including ID, role, email).
        :return: A JWT token as a string.
        """
        expiration_time = datetime.datetime.utcnow() + datetime.timedelta(hours=24)  # Zmienione na 24 godziny
        payload = {
            'user_id': str(user['_id']),
            'role': user['role'],  # Including the user's role in the token
            'email': user['email'],  # Including the user's email in the token
            'exp': int(expiration_time.timestamp())  # Set the expiration time for the token as UNIX timestamp
        }

        # Secret key for signing the token (must be a string)
        secret_key = self.secret_key  # Ensure this is set correctly elsewhere in the class

        # Create a JsonWebToken object specifying supported algorithms
        jwt = JsonWebToken(algorithms=['HS256'])

        # Encoding the token with the secret key
        token = jwt.encode({'alg': 'HS256'}, payload, secret_key)
        
        return token.decode('utf-8')  # Return the token as a string