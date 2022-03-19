from flask import jsonify


def get_prices(game_instance):
    return jsonify(game_instance.prices.get_prices())


prices_interface = {
    'GET_PRICES': get_prices,
}
