
from ...utilities.utils import dict_keys_to_camel_case, to_camel_case
from ...constants import Game_Mode, Locations


class Location():
    def __init__(self, game):
        self.game = game
        self.location = Locations.FLORIDA

    def set_location(self, location):
        if hasattr(self, 'location'):
            setattr(self, 'location', location)
            return getattr(self, 'location')

    def get_location(self):
        return getattr(self, 'location')

# input: key
# output: object in camel case with:
# location, prices, day, gameState
    def change_location(self, key):
        # select new location
        self.game.game_manager.jet(key)
        updated_location = to_camel_case(self.location.value)
        # update prices
        self.game.prices.set_prices()
        updated_prices = dict_keys_to_camel_case(self.game.prices.get_prices())
        # increment day
        self.game.game_manager.increment_day()
        updated_day = self.game.game_manager.day
        # update game state
        self.game.game_manager.set_game_mode(Game_Mode.BUY_SELL_JET)
        updated_game_state = to_camel_case(
            self.game.game_manager.get_game_mode().value)
        payload = {
            'location': updated_location,
            'prices': updated_prices,
            'day': updated_day,
            'gameState': updated_game_state
        }
        return payload
