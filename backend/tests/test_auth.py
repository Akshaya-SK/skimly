# minimal tests (example). To run: pytest -q
import json
from backend.app import create_app
from backend.database import db

app = create_app()

def test_signup_and_login(tmp_path, client=None):
    client = app.test_client()
    # create user
    res = client.post('/auth/signup', json={'email': 't@example.com', 'password': 'pass1234'})
    assert res.status_code == 200
    data = res.get_json()
    assert 'token' in data

    # login
    res2 = client.post('/auth/login', json={'email': 't@example.com', 'password': 'pass1234'})
    assert res2.status_code == 200
    data2 = res2.get_json()
    assert 'token' in data2
