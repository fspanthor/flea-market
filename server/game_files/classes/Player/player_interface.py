from flask import jsonify


def check_maximum_buy(game_instance, params):
    return jsonify(game_instance.player.check_maximum_buy(params['value']))


def buy_item(game_instance, params):
    return jsonify(game_instance.player.buy_item(params['item'], params['amount']))


def sell_item(game_instance, params):
    return jsonify(game_instance.player.sell_item(params['item'], params['amount']))


def select_item_to_manage(game_instance, params):
    return jsonify(game_instance.player.select_item_to_manage(params['key']))


def transfer_item_to_stash(game_instance, params):
    return jsonify(game_instance.player.transfer_item_to_stash(params['amount']))


def transfer_item_to_trench_coat(game_instance, params):
    return jsonify(game_instance.player.transfer_item_to_trench_coat(params['amount']))


player_interface = {
    'CHECK_MAXIMUM_BUY': check_maximum_buy,
    'BUY_ITEM': buy_item,
    'SELL_ITEM': sell_item,
    'SELECT_ITEM_TO_MANAGE': select_item_to_manage,
    'TRANSFER_ITEM_TO_STASH': transfer_item_to_stash,
    'TRANSFER_ITEM_TO_TRENCH_COAT': transfer_item_to_trench_coat
}
