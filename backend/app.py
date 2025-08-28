from flask import Flask, jsonify, request
from flask_cors import CORS
import nltk

from .config import Config
from .database import db
from .auth import auth_bp
from .routes.articles import articles_bp
from .models import User, Article


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

    # --------------------------------------------------------
    # 🚀 ACCOUNT APIs (DB-backed)
    # --------------------------------------------------------

    # ✅ Get logged in user info
    @app.route("/api/me", methods=["GET"])
    def me():
        email = request.args.get("email")
        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify({
                "id": user.id,
                "email": user.email,
                "created_at": user.created_at.isoformat()
            })
        return jsonify({"error": "User not found"}), 404

    # ✅ Get user Articles (previously PDFs)
    @app.route("/api/pdfs", methods=["GET"])
    def get_pdfs():
        email = request.args.get("email")
        user = User.query.filter_by(email=email).first()
        if user:
            pdfs = [
                {
                    "id": a.id,
                    "title": a.title,
                    "summary": a.summary,
                    "keywords": a.keywords_list(),
                    "date": a.created_at.isoformat()
                }
                for a in user.articles
            ]
            return jsonify(pdfs)
        return jsonify({"error": "User not found"}), 404

    # --------------------------------------------------------
    # 🚀 EXTRA: Insert test data directly from API
    # --------------------------------------------------------

    @app.route("/api/users", methods=["POST"])
    def create_user():
        data = request.json
        email = data.get("email")
        password_hash = data.get("password")  # hash later
        if not email or not password_hash:
            return jsonify({"error": "Missing email or password"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"error": "User already exists"}), 400

        user = User(email=email, password_hash=password_hash)
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User created", "id": user.id}), 201

    @app.route("/api/articles", methods=["POST"])
    def create_article():
        data = request.json
        email = data.get("email")
        title = data.get("title")
        summary = data.get("summary")
        keywords = ",".join(data.get("keywords", []))

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        article = Article(
            title=title,
            summary=summary,
            keywords=keywords,
            user=user
        )
        db.session.add(article)
        db.session.commit()

        return jsonify({"message": "Article added", "id": article.id}), 201

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
