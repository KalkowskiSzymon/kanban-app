from flask import Flask
from flask_cors import CORS
from routes import register_routes
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS (Cross-Origin Resource Sharing) for communication with the frontend
CORS(app, origins=Config.CORS, supports_credentials=True) 

# Register routes for user registration and login
register_routes(app)

if __name__ == '__main__':
    """
    Main entry point for the Flask application.

    This block runs the Flask app in debug mode, which helps during development by automatically 
    reloading the server on code changes and providing detailed error messages.

    If the script is executed directly, the Flask application will start, handling incoming requests 
    on the specified port (default: 5000).
    """
    app.run(debug=True)
