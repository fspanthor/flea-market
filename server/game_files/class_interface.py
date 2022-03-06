from flask import jsonify


def set_prices(game_instance):
    game_instance.prices.set_prices()
    print('new prices: ', game_instance.prices.get_prices())
    return jsonify(game_instance.prices.get_prices())


def get_prices(game_instance):
    return jsonify(game_instance.prices.get_prices())


def check_maximum_buy(game_instance, params):
    return jsonify(game_instance.player.check_maximum_buy(params['value']))


def change_wallet(game_instance, params):
    return jsonify(game_instance.player.trench_coat.change_wallet(params['money'], params['amountChange']))


def retrieve_game_state(game_instance):
    return jsonify(game_instance.game_manager.game_state())


def buy_sell_jet(game_instance, params):
    return jsonify(game_instance.game_manager.buy_sell_jet(params['key']))


def instructions(game_instance, params):
    return jsonify(game_instance.instructions.instructionsText(params['key']))


def call_function(function_name, params, game_instance):
    switcher = {
        'SET_PRICES': set_prices,
        'GET_PRICES': get_prices,
        'CHECK_MAXIMUM_BUY': check_maximum_buy,
        'CHANGE_WALLET': change_wallet,
        'RETRIEVE_GAME_STATE': retrieve_game_state,
        'BUY_SELL_JET': buy_sell_jet,
        'INSTRUCTIONS': instructions
    }
    func = switcher.get(function_name, 'invalid function')
    if params is None:
        return func(game_instance)
    else:
        return func(game_instance, params)
