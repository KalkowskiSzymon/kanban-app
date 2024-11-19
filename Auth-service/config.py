import os
from dotenv import load_dotenv

# Loading environment variables from the .env file
load_dotenv()

class Config:
    """
    Configuration class for the application, which loads environment variables from the .env file.

    This class contains settings such as:
    - SECRET_KEY: A key used for securing sessions and signing tokens.
    - MONGO_URI: URI for the MongoDB database connection.
    - CORS: Configuration for Cross-Origin Resource Sharing (CORS) to define which domains can communicate with the server.

    Each of these values is loaded from the .env file using the `dotenv` library.
    """

    SECRET_KEY = os.getenv('SECRET_KEY')  # Secret key for signing sessions and tokens
    MONGO_URI = os.getenv('MONGO_URI')  # MongoDB connection URI
    CORS = os.getenv('CORS')  # CORS configuration for controlling resource sharing
