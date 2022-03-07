from flask import jsonify


def instructions(game_instance, params):
    return jsonify(game_instance.instructions.instructions_prompt(params['key']))


def get_instructions(game_instance):
    return jsonify(game_instance.instructions.get_instructions())


def instructions_continue(game_instance, params):
    return jsonify(game_instance.instructions.instructions_continue(params['key']))


instructions_interface = {
    'INSTRUCTIONS': instructions,
    'GET_INSTRUCTIONS': get_instructions,
    'INSTRUCTIONS_CONTINUE': instructions_continue,
}
