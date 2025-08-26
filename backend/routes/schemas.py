# simple serializers to control the JSON shape returned to client

def article_to_dict(article):
    return {
        'id': article.id,
        'title': article.title,
        'summary': article.summary,
        'keywords': article.keywords_list(),
        'created_at': article.created_at.isoformat(),
        'user_id': article.user_id
    }

def user_to_dict(user):
    return {
        'id': user.id,
        'email': user.email,
        'created_at': user.created_at.isoformat()
    }
