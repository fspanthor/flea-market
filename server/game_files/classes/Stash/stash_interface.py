from flask import jsonify


def get_stash(game_instance):
    return jsonify(game_instance.player.stash.get_stash())


def stash_continue(game_instance, params):
    return jsonify(game_instance.player.stash.stash_continue(params['key']))


def bank_continue(game_instance, params):
    return jsonify(game_instance.player.stash.bank_continue(params['key']))


def deposit_to_bank(game_instance, params):
    return jsonify(game_instance.player.stash.deposit_to_bank(params['amount']))


def withdraw_from_bank(game_instance, params):
    return jsonify(game_instance.player.stash.withdraw_from_bank(params['amount']))


stash_interface = {
    'GET_STASH': get_stash,
    'STASH_CONTINUE': stash_continue,
    'BANK_CONTINUE': bank_continue,
    'DEPOSIT_TO_BANK': deposit_to_bank,
    'WITHDRAW_FROM_BANK': withdraw_from_bank
}
