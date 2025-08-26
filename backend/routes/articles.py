from flask import Blueprint, request, jsonify, g
from werkzeug.utils import secure_filename
from ..models import Article, User
from ..database import db
from ..routes.schemas import article_to_dict
from ..utils import token_required, extract_text_from_pdf_stream, analyze_text_and_summarize
import io

articles_bp = Blueprint('articles', __name__, url_prefix='/articles')

ALLOWED_EXTENSIONS = {'pdf'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@articles_bp.route('/upload', methods=['POST'])
@token_required
def upload_article():
    if 'file' not in request.files:
        return jsonify({'message': 'Missing file'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'Empty filename'}), 400
    if not allowed_file(file.filename):
        return jsonify({'message': 'Only PDF allowed'}), 400

    filename = secure_filename(file.filename)
    # Read into bytes io
    stream = io.BytesIO(file.read())
    text = extract_text_from_pdf_stream(stream)
    if not text.strip():
        return jsonify({'message': 'Could not extract text from PDF'}), 400

    analysis = analyze_text_and_summarize(text)
    title = request.form.get('title') or filename
    keywords_csv = ','.join(analysis.get('keywords', []))

    new = Article(title=title, summary=analysis.get('summary'), keywords=keywords_csv, user_id=g.current_user['user_id'])
    db.session.add(new)
    db.session.commit()

    return jsonify({'article': article_to_dict(new)})

@articles_bp.route('/list', methods=['GET'])
@token_required
def list_articles():
    user_id = g.current_user['user_id']
    q = request.args.get('search', '').strip()
    date = request.args.get('date', '').strip()  # expect YYYY-MM-DD
    query = Article.query.filter_by(user_id=user_id)
    if q:
        like = f"%{q}%"
        query = query.filter((Article.title.ilike(like)) | (Article.summary.ilike(like)) | (Article.keywords.ilike(like)))
    if date:
        # match date prefix of ISO timestamp
        query = query.filter(Article.created_at.like(f"{date}%"))
    query = query.order_by(Article.created_at.desc())
    articles = query.all()
    return jsonify({'articles': [article_to_dict(a) for a in articles]})

@articles_bp.route('/delete/<int:article_id>', methods=['DELETE'])
@token_required
def delete_article(article_id):
    user_id = g.current_user['user_id']
    article = Article.query.filter_by(id=article_id, user_id=user_id).first()
    if not article:
        return jsonify({'message': 'Article not found'}), 404
    db.session.delete(article)
    db.session.commit()
    return jsonify({'success': True})
