from flask import jsonify


def check_maximum_buy(game_instance, params):
    return jsonify(game_instance.player.check_maximum_buy(params['value']))


def change_wallet(game_instance, params):
    return jsonify(game_instance.player.trench_coat.change_wallet(params['money'], params['amountChange']))


player_interface = {
    'CHECK_MAXIMUM_BUY': check_maximum_buy,
    'CHANGE_WALLET': change_wallet,
}
