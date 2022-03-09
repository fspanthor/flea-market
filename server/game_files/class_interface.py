from .classes.Instructions.instructions_interface import instructions_interface
from .classes.Prices.prices_interface import prices_interface
from .classes.Player.player_interface import player_interface
from .classes.GameManager.game_manager_interface import game_manager_interface
from .classes.Shark.shark_interface import shark_interface
from .classes.Stash.stash_interface import stash_interface
from .classes.TrenchCoat.trench_coat_interface import trench_coat_interface


switcher = instructions_interface | prices_interface | player_interface | game_manager_interface | shark_interface | stash_interface | trench_coat_interface


def call_function(function_name, params, game_instance):
    func = switcher.get(function_name, 'invalid function')
    if params is None:
        return func(game_instance)
    else:
        return func(game_instance, params)
