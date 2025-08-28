from flask import Flask, jsonify
from flask_cors import CORS
import nltk

from .config import Config
from .database import db
from .auth import auth_bp
from .routes.articles import articles_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    # Initialize DB
    db.init_app(app)
    with app.app_context():
        db.create_all()

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(articles_bp)

    # Root route
    @app.route('/')
    def home():
        return {"message": "Backend is running"}

    # Health check
    @app.route('/ping')
    def ping():
        return jsonify({'status': 'ok'})

    return app


if __name__ == '__main__':
    # Ensure nltk resources
    try:
        nltk.data.find('tokenizers/punkt')
        nltk.data.find('corpora/stopwords')
    except LookupError:
        nltk.download('punkt')
        nltk.download('stopwords')

    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
