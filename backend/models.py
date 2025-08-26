from datetime import datetime
from .database import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    articles = db.relationship('Article', back_populates='user', cascade='all, delete-orphan')

class Article(db.Model):
    __tablename__ = 'articles'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(512))
    summary = db.Column(db.Text)
    keywords = db.Column(db.String(512))  # comma separated
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='articles')

    def keywords_list(self):
        return [k for k in (self.keywords or "").split(',') if k]
