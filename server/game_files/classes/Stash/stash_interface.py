from flask import jsonify


def get_stash(game_instance):
    return jsonify(game_instance.player.stash.get_stash())


def stash_continue(game_instance, params):
    return jsonify(game_instance.player.stash.stash_continue(params['key']))


def bank_continue(game_instance, params):
    return jsonify(game_instance.player.stash.bank_continue(params['key']))


stash_interface = {
    'GET_STASH': get_stash,
    'STASH_CONTINUE': stash_continue,
    'BANK_CONTINUE': bank_continue
}
