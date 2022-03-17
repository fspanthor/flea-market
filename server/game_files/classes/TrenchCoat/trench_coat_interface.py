from flask import jsonify


def get_trench_coat(game_instance):
    return jsonify(game_instance.player.trench_coat.get_trench_coat())


trench_coat_interface = {
    'GET_TRENCH_COAT': get_trench_coat
}
