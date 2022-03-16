from flask import jsonify


def get_location(game_instance):
    return jsonify(game_instance.location.get_location().value)


def change_location(game_instance, params):
    print('running')
    return jsonify(game_instance.location.change_location(params['key']))


location_interface = {
    'GET_LOCATION': get_location,
    'CHANGE_LOCATION': change_location,
}
