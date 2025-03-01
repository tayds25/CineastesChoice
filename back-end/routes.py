from flask import request, jsonify, make_response
from app import app, db
from models import User
import traceback
import sys

@app.route('/api/register', methods=['POST'])
def register():
    """Handle user registration requests"""
    # Print request details for debugging
    print(f"Register endpoint called with method: {request.method}")
    print(f"Headers: {request.headers}")

    try:
        # Check if content type is correct
        if not request.is_json:
            print("Error: Request content type is not JSON")
            return jsonify({"error": "Content-Type must be application/json"}), 400

        # Get JSON data
        data = request.get_json()
        print(f"Received registration data: {data}")

        # Check if request data is None
        if data is None:
            print("Error: Request body is empty or not valid JSON")
            return jsonify({"error": "Request body must be valid JSON"}), 400

        # Check required fields
        required_fields = ['name', 'email', 'password']
        if not all(k in data for k in required_fields):
            missing = [k for k in required_fields if k not in data]
            print(f"Error: Missing required fields: {missing}")
            return jsonify({"error": f"Missing required fields: {missing}"}), 400

        # Check if user already exists
        existing_name = User.query.filter_by(name=data['name']).first()
        if existing_name:
            print(f"Error: Username '{data['name']}' already exists")
            return jsonify({"error": "Username already exists"}), 400

        existing_email = User.query.filter_by(email=data['email']).first()
        if existing_email:
            print(f"Error: Email '{data['email']}' already exists")
            return jsonify({"error": "Email already exists"}), 400

        # Create new user
        new_user = User(name=data['name'], email=data['email'])
        new_user.set_password(data['password'])

        # Add to database
        db.session.add(new_user)
        db.session.commit()

        print(f"User {data['name']} registered successfully")
        return jsonify({"message": "User registered successfully", "user_id": new_user.id}), 201

    except Exception as e:
        print(f"Exception during registration: {str(e)}", file=sys.stderr)
        print(traceback.format_exc(), file=sys.stderr)
        db.session.rollback()
        return jsonify({"error": "Server error occurred. Check server logs."}), 500

@app.route('/api/login', methods=['POST'])
def login():
    """Handle user login"""
    try:
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json"}), 400

        data = request.get_json()

        if not all(k in data for k in ['name', 'password']):
            return jsonify({"error": "Missing username or password"}), 400

        # Find user by username
        user = User.query.filter_by(name=data['name']).first()

        # Check if user exists and password is correct
        if user and user.check_password(data['password']):
            return jsonify({
                "message": "Login successful",
                "user_id": user.id,
                "name": user.name
            }), 200

        return jsonify({"error": "Invalid username or password"}), 401

    except Exception as e:
        print(f"Login error: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": "Server error occurred"}), 500

@app.route('/api/test', methods=['GET'])
def test():
    """Test endpoint to verify API is working"""
    return jsonify({"message": "API is working"}), 200

@app.route('/api/users', methods=['GET'])
def get_all_users():
    """Get all users (for testing purposes)"""
    try:
        users = User.query.all()
        user_list = [{"id": user.id, "name": user.name, "email": user.email} for user in users]
        return jsonify({"users": user_list}), 200
    except Exception as e:
        print(f"Error fetching users: {str(e)}")
        return jsonify({"error": "Server error occurred"}), 500

# Add OPTIONS handler for CORS preflight requests
@app.route('/api/register', methods=['OPTIONS'])
def options_register():
    response = make_response()
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response