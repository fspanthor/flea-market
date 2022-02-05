from flask import Flask, request, jsonify, session
from flask_cors import CORS, cross_origin
from flask_session.__init__ import Session
import random
import json
from game_files.classes import Game

# app = Flask(__name__, static_folder='../client/build', static_url_path='/')
app = Flask(__name__)
CORS(app)
app.config["SESSION_PERMANENT"] = False
app.config['SESSION_TYPE'] = 'filesystem'
# create secret key with:
# >>> import os
# >>> os.urandom(24)
app.config['SECRET_KEY'] = '\xe5\xec\xcd\x1a\xdf\xd9\xfb\xf7\xc1\xadO\xed\x8b\xa2"\xea\xe4d\xd9!\x0e\x92D\x11'
Session(app)


# this is key for making this run in production but messes up local.. need to fix this
# @app.route('/')
# @cross_origin(supports_credentials=True)
# def index():
#    return app.send_static_file('index.html')


@app.route('/', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def hello_world():
    print('request method: ', request.method)

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
        print('get')
        print('nachos: ', game_instance.prices.get_prices())
        return 'hello'

    # run a function to set prices

    if request.method == 'POST':
        function_from_request = request.get_json()['function']
        print(function_from_request)

        def set_prices():
            game_instance.prices.set_prices()
            print('new prices: ', game_instance.prices.get_prices())
            return jsonify(game_instance.prices.get_prices())

        def get_prices():
            return jsonify(game_instance.prices.get_prices())

        def call_function(function_name):
            switcher = {
                'SET_PRICES': set_prices,
                'GET_PRICES': get_prices
            }
            func = switcher.get(function_name, 'invalid function')
            func_return = func()
            return func_return

        function_response = call_function(function_from_request)

    return (function_response)

# if __name__ == '__main__':
 #   app.run()
