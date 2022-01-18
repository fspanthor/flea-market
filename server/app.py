from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def test(x):
    print(x['count'] + 1)
    return x['count'] + 1


@app.route('/', methods=['POST', 'GET'])
def hello_world():
    if request.method == 'GET':
        return 'hello'
    if request.method == 'POST':
        body = request.get_json()
        print(body)
        test(body)
        return jsonify(test(body))
