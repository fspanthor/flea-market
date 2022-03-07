from .classes.Instructions.instructions_interface import instructions_interface
from .classes.Prices.prices_interface import prices_interface
from .classes.Player.player_interface import player_interface
from .classes.GameManager.game_manager_interface import game_manager_interface

switcher = instructions_interface | prices_interface | player_interface | game_manager_interface


def call_function(function_name, params, game_instance):
    func = switcher.get(function_name, 'invalid function')
    if params is None:
        return func(game_instance)
    else:
        return func(game_instance, params)
