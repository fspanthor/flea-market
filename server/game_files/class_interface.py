from flask import jsonify


def set_prices(game_instance):
    game_instance.prices.set_prices()
    print('new prices: ', game_instance.prices.get_prices())
    return jsonify(game_instance.prices.get_prices())


def get_prices(game_instance):
    return jsonify(game_instance.prices.get_prices())


def call_function(function_name, params, game_instance):
    switcher = {
        'SET_PRICES': set_prices,
        'GET_PRICES': get_prices
    }
    func = switcher.get(function_name, 'invalid function')
    if params is None:
        return func(game_instance)
    else:
        return func(game_instance, params)
