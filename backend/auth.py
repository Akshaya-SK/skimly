from flask import Blueprint, request, jsonify, current_app, g
from .models import User
from .database import db
from .utils import hash_password, verify_password
import jwt
import datetime
from .config import Config

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')
JWT_SECRET = Config.JWT_SECRET

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json() or {}
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''
    if not email or not password:
        return jsonify({'message': 'Email and password required'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400
    pw_hash = hash_password(password)
    user = User(email=email, password_hash=pw_hash)
    db.session.add(user)
    db.session.commit()
    token = jwt.encode({'user_id': user.id, 'email': user.email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)}, JWT_SECRET, algorithm='HS256')
    return jsonify({'token': token})

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''
    if not email or not password:
        return jsonify({'message': 'Email and password required'}), 400
    user = User.query.filter_by(email=email).first()
    if not user or not verify_password(user.password_hash, password):
        return jsonify({'message': 'Invalid credentials'},), 401
    token = jwt.encode({'user_id': user.id, 'email': user.email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)}, JWT_SECRET, algorithm='HS256')
    return jsonify({'token': token})

# Protected route to delete account and all data
from .utils import token_required
@auth_bp.route('/delete', methods=['DELETE'])
@token_required
def delete_account():
    payload = g.current_user
    user = User.query.get(payload.get('user_id'))
    if not user:
        return jsonify({'message': 'User not found'}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Account deleted'})
