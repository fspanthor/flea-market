from flask import Flask, request, jsonify, session
from flask_cors import CORS, cross_origin
from flask_session.__init__ import Session
import random
import json

app = Flask(__name__, static_folder='../client/build', static_url_path='/')
CORS(app)
app.config["SESSION_PERMANENT"] = False
app.config['SESSION_TYPE'] = 'filesystem'
# create secret key with:
# >>> import os
# >>> os.urandom(24)
app.config['SECRET_KEY'] = '\xe5\xec\xcd\x1a\xdf\xd9\xfb\xf7\xc1\xadO\xed\x8b\xa2"\xea\xe4d\xd9!\x0e\x92D\x11'
Session(app)


def test(x):
    print(session.get("id"))
    return x['count'] + 1


class Game:
    def __init__(self):
        self.player = Player()
        self.prices = Prices()


class Player:
    def __init__(self):
        self.inventory = Inventory()


class Inventory:
    def __init__(self):
        self.nachos = 3
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


class Prices:
    def __init__(self):
        self.nachos = 0
        self.dvds = 0
        self.hotSauce = 0
        self.pocket_knives = 0
        self.cell_phones = 0
        self.golf_carts = 0

    def set_prices(self):
        #10 - 60
        self.nachos = 10
        #70 -250
        self.dvds = 70
        #300 - 900
        self.hotSauce = 300
        #1000 - 4500
        self.pocket_knives = 1000
        #5000 - 14000
        self.cell_phones = 5000
        #15000 - 30000
        self.golf_carts = 15000

    def get_prices(self):
        return self.__dict__


@app.route('/')
@cross_origin(supports_credentials=True)
def index():
    return app.send_static_file('index.html')


@app.route('/', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def hello_world():

    # if session is not created, create session and game
    if not session.get("id"):
        print('creating new session')
        session["id"] = random.randint(0, 9)
    if not session.get("game"):
        session['game'] = Game()

    game_instance = session.get('game')

    # get some attribute from session
    '''
    if request.method == 'GET':
        print('game: ', session.get("game"))
        x = session.get("game")
        print('nachos: ', x.player.inventory.get_amount('nachos'))
        return 'hello'
'''

    # get some attribute from session

    if request.method == 'GET':

        print('nachos: ', game_instance.prices.get_prices())
        return 'hello'

    # run a function to set prices

    if request.method == 'POST':
        function = request.get_json()['function']
        print(function)

        if (function == 'setPrices'):
            print(game_instance.prices.set_prices())

    return jsonify('200')


if __name__ == '__main__':
    app.run()

'''
    if request.method == 'POST':
        print('test: ', session.get("player"))
        body = request.get_json()
        print(body)
        test(body)
        return jsonify(test(body))
'''
