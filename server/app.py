from flask import Flask, request, jsonify, session
from flask_cors import CORS, cross_origin
from flask_session.__init__ import Session
import random

app = Flask(__name__)
CORS(app)
app.config["SESSION_PERMANENT"] = False
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)


def test(x):
    print(session.get("name"))
    return x['count'] + 1


@app.route('/', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def hello_world():
    if not session.get("name"):
        print('creating new session')
        session["name"] = random.randint(0, 9)
    if request.method == 'GET':
        print(session)
        return 'hello'
    if request.method == 'POST':
        body = request.get_json()
        print(body)
        test(body)
        return jsonify(test(body))
