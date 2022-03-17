from flask import jsonify


def retrieve_game_state(game_instance):
    return jsonify(game_instance.game_manager.game_state())


def retrieve_game_state(game_instance):
    return jsonify(game_instance.game_manager.get_day())


def buy_sell_jet(game_instance, params):
    return jsonify(game_instance.game_manager.buy_sell_jet(params['key']))


def jet(game_instance, params):
    return jsonify(game_instance.game_manager.jet(params['key']))


def new_game(game_instance):
    return jsonify(game_instance.game_manager.new_game())


def get_day(game_instance):
    return jsonify(game_instance.game_manager.get_day())


game_manager_interface = {
    'BUY_SELL_JET': buy_sell_jet,
    'RETRIEVE_GAME_STATE': retrieve_game_state,
    'JET': jet,
    'NEW_GAME': new_game,
    'GET_DAY': get_day
}
