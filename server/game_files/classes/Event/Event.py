
from ...constants import Game_Mode
from ...utilities.utils import to_camel_case


class Event():
    def __init__(self, game):
        self.game = game

    def heal(self):
        self.game.game_manager.set_game_sub_menu('')
        self.game.game_manager.set_game_mode(Game_Mode.BUY_SELL_JET)
        current_cash = self.game.player.trench_coat.cash

        # reset health
        # subtract cost
        if (current_cash >= 4000):
            self.game.player.trench_coat.subtract_cash(4000)
            self.game.chase.reset_health()

        payload = {
            'gameState': to_camel_case(self.game.game_manager.get_game_mode().value),
            'gameSubMenu': '',
        }
        return payload
