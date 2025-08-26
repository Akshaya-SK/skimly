import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret')
    JWT_SECRET = os.getenv('JWT_SECRET', 'jwt-secret')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///skimly.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
