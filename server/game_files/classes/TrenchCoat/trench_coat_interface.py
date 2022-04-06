from flask import jsonify


def get_trench_coat(game_instance):
    return jsonify(game_instance.player.trench_coat.get_trench_coat())


def get_corn_dogs(game_instance):
    return jsonify(game_instance.player.trench_coat.get_corn_dogs())


trench_coat_interface = {
    'GET_TRENCH_COAT': get_trench_coat,
    'GET_CORN_DOGS': get_corn_dogs
}
