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


class Player:
    def __init__(self):
        self.inventory = Inventory()


class Inventory:
    def __init__(self):
        self.nachos = 0
        self.dvds = 0
        self.hotSauce = 0
        self.pocket_knives = 0
        self.cell_phones = 0
        self.golf_carts = 0
        self.money = 0

    def get_amount(self, item):
        if hasattr(self, item):
            return getattr(self, item)

    def add_inventory(self, item, amount):
        if hasattr(self, item):
            new_amount = getattr(self, item) + amount
            setattr(self, item, new_amount)

    def changeWallet(self, money, amount_change):
        new_amount = money + amount_change
        setattr(self, money, new_amount)


@app.route('/', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def hello_world():
    if not session.get("name"):
        print('creating new session')
        session["name"] = random.randint(0, 9)
    if not session.get("player"):
        session['player'] = Player()
    if request.method == 'GET':
        print('player: ', session.get("player"))
        x = session.get("player")
        print(x.inventory.get_amount('nachos'))
        return 'hello'
    if request.method == 'POST':
        print('test: ', session.get("player"))
        body = request.get_json()
        print(body)
        test(body)
        return jsonify(test(body))
