from flask import jsonify


def get_shark(game_instance):
    return jsonify(game_instance.shark.get_shark())


shark_interface = {
    'GET_SHARK': 'get_shark'
}
