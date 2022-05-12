from flask import jsonify

from ...constants import Items


def buy_sell_jet(game_instance, params):
    return jsonify(game_instance.game_manager.buy_sell_jet(params['key']))


def new_game(game_instance):
    return jsonify(game_instance.game_manager.new_game())


def get_day(game_instance):
    return jsonify(game_instance.game_manager.get_day())


def stage_current_item(game_instance, params):
    return jsonify(game_instance.game_manager.stage_current_item(params['key']))


def persist_high_score(game_instance):
    return jsonify(game_instance.game_manager.persist_high_score())


def restart_game(game_instance):
    return jsonify(game_instance.game_manager.restart_game())


def get_high_scores(game_instance):
    return jsonify(game_instance.game_manager.get_high_scores())


game_manager_interface = {
    'BUY_SELL_JET': buy_sell_jet,
    'NEW_GAME': new_game,
    'GET_DAY': get_day,
    'STAGE_CURRENT_ITEM': stage_current_item,
    'PERSIST_HIGH_SCORE': persist_high_score,
    'RESTART_GAME': restart_game,
    'GET_HIGH_SCORES': get_high_scores,
}
