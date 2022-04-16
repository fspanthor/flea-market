from flask import jsonify

from ...utilities.utils import to_camel_case


def get_location(game_instance):
    return jsonify(to_camel_case(game_instance.location.get_location().value))


def change_location(game_instance, params):
    return jsonify(game_instance.location.change_location(params['key']))


location_interface = {
    'GET_LOCATION': get_location,
    'CHANGE_LOCATION': change_location,
}
