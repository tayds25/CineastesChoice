from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)

# Configure CORS to accept requests from frontend
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://localhost:3000"],
                            "methods": ["GET", "POST", "OPTIONS"],
                            "allow_headers": ["Content-Type", "Authorization"]}})

# Configure SQLite database
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'instance', 'users.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'cineasteschoice123'

# Initialize database
db = SQLAlchemy(app)

from routes import *

if __name__ == '__main__':
    # Create instance directory if it doesn't exist
    os.makedirs(os.path.join(basedir, 'instance'), exist_ok=True)

    # Create all database tables
    with app.app_context():
        db.create_all()
        print("Database tables created successfully!")

    app.run(debug=True)