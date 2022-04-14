from flask import jsonify


def heal(game_instance):
    return jsonify(game_instance.event.heal())


def event_continue(game_instance):
    return jsonify(game_instance.event.event_continue())


event_interface = {
    'HEAL': heal,
    'EVENT_CONTINUE': event_continue
}
