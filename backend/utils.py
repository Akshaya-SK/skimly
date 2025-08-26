import io
from functools import wraps
from flask import request, jsonify, g
import jwt
import os
from werkzeug.security import generate_password_hash, check_password_hash
import pdfplumber
from PyPDF2 import PdfReader
from .config import Config
from .summarize import summarize_text, extract_keywords

JWT_SECRET = Config.JWT_SECRET

def hash_password(password):
    return generate_password_hash(password)

def verify_password(pw_hash, password):
    return check_password_hash(pw_hash, password)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.headers.get('Authorization', None)
        if not auth:
            return jsonify({'message': 'Token missing'}), 401
        parts = auth.split()
        if parts[0].lower() != 'bearer':
            return jsonify({'message': 'Invalid auth header'}), 401
        if len(parts) == 1:
            return jsonify({'message': 'Token missing'}), 401
        token = parts[1]
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            g.current_user = payload  # {user_id, email}
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expired'}), 401
        except Exception:
            return jsonify({'message': 'Token invalid'}), 401
        return f(*args, **kwargs)
    return decorated

def extract_text_from_pdf_stream(stream):
    """
    Try pdfplumber first; fallback to PyPDF2.
    stream: file-like binary stream (seekable)
    """
    text = ''
    try:
        stream.seek(0)
        with pdfplumber.open(stream) as pdf:
            pages = []
            for p in pdf.pages:
                pages.append(p.extract_text() or '')
            text = '\n'.join(pages)
    except Exception:
        # fallback
        try:
            stream.seek(0)
            reader = PdfReader(stream)
            pages = []
            for p in reader.pages:
                try:
                    pages.append(p.extract_text() or '')
                except:
                    pages.append('')
            text = '\n'.join(pages)
        except Exception:
            text = ''
    return text

def analyze_text_and_summarize(text):
    """
    Returns dict { summary: str, keywords: [str] }
    """
    # basic heuristics: if very long, increase sentences
    length = len(text.split())
    num_sentences = 3
    if length > 2000:
        num_sentences = 6
    elif length > 1000:
        num_sentences = 5
    elif length > 600:
        num_sentences = 4

    summary = summarize_text(text, num_sentences=num_sentences)
    keywords = extract_keywords(text, top_n=6)
    return {'summary': summary, 'keywords': keywords}
