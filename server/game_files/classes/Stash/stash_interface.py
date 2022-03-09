from flask import jsonify


def get_stash(game_instance):
    return jsonify(game_instance.stash.get_stash())


stash_interface = {
    'GET_STASH': 'get_stash'
}
