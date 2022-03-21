from flask import jsonify


def get_shark(game_instance):
    return jsonify(game_instance.shark.get_shark())


def shark_continue(game_instance, params):
    return jsonify(game_instance.shark.shark_continue(params['key']))


shark_interface = {
    'GET_SHARK': get_shark,
    'SHARK_CONTINUE': shark_continue
}
