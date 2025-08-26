from flask import Flask, jsonify
from flask_cors import CORS
from .config import Config
from .database import init_db
from .models import db as _db  # noqa
from .auth import auth_bp
from .routes.articles import articles_bp
import nltk

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return {"message": "Backend is running "}

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    # init db
    from .database import db
    db.init_app(app)
    with app.app_context():
        db.create_all()

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(articles_bp)

    # basic health
    @app.route('/ping')
    def ping():
        return jsonify({'status': 'ok'})

    return app

if __name__ == '__main__':
    # ensure nltk resources
    try:
        nltk.data.find('tokenizers/punkt')
        nltk.data.find('corpora/stopwords')
    except LookupError:
        nltk.download('punkt')
        nltk.download('stopwords')

    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
