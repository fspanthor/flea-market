from flask import jsonify


def get_chase(game_instance):
    return jsonify(game_instance.chase.get_chase())


def start_chase(game_instance):
    return jsonify(game_instance.chase.start_chase())


def run(game_instance):
    return jsonify(game_instance.chase.run())


def exit_chase(game_instance):
    return jsonify(game_instance.chase.exit_chase())


def bribe(game_instance):
    return jsonify(game_instance.chase.bribe())


def run_or_bribe_continue(game_instance):
    return jsonify(game_instance.chase.run_or_bribe_continue())


def run_or_bribe(game_instance, params):
    return jsonify(game_instance.chase.run_or_bribe(params['key']))


chase_interface = {
    'GET_CHASE': get_chase,
    'START_CHASE': start_chase,
    'RUN': run,
    'EXIT_CHASE': exit_chase,
    'RUN_OR_BRIBE': run_or_bribe,
    'BRIBE': bribe,
    'RUN_OR_BRIBE_CONTINUE': run_or_bribe_continue
}
