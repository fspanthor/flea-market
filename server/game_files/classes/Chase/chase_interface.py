from flask import jsonify


def get_chase(game_instance):
    return jsonify(game_instance.chase.get_chase())


def start_chase(game_instance):
    return jsonify(game_instance.chase.start_chase())


def run(game_instance):
    return jsonify(game_instance.chase.run())


def exit_chase(game_instance):
    return jsonify(game_instance.chase.exit_chase())


chase_interface = {
    'GET_CHASE': get_chase,
    'START_CHASE': start_chase,
    'RUN': run,
    'EXIT_CHASE': exit_chase
}
