from flask import jsonify


def get_shark(game_instance):
    return jsonify(game_instance.shark.get_shark())


def shark_continue(game_instance, params):
    return jsonify(game_instance.shark.shark_continue(params['key']))


def repay_shark(game_instance, params):
    return jsonify(game_instance.shark.repay_shark(params['amount']))


def borrow_from_shark(game_instance, params):
    return jsonify(game_instance.shark.borrow_from_shark(params['amount']))


shark_interface = {
    'GET_SHARK': get_shark,
    'SHARK_CONTINUE': shark_continue,
    'REPAY_SHARK': repay_shark,
    'BORROW_FROM_SHARK': borrow_from_shark
}
