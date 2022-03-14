from flask import jsonify


def get_location(game_instance):
    return jsonify(game_instance.location.get_location().value)


location_interface = {
    'GET_LOCATION': get_location,
}
