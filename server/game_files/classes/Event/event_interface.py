from flask import jsonify


def heal(game_instance):
    return jsonify(game_instance.event.heal())


def event_continue(game_instance):
    return jsonify(game_instance.event.event_continue())


def yes_or_no_continue(game_instance, params):
    return jsonify(game_instance.event.yes_or_no_continue(params['key']))


event_interface = {
    'HEAL': heal,
    'EVENT_CONTINUE': event_continue,
    'YES_OR_NO_CONTINUE': yes_or_no_continue
}
