from flask import jsonify


def heal(game_instance):
    return jsonify(game_instance.event.heal())


event_interface = {
    'HEAL': heal,
}
