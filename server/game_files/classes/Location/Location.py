
import random
from ...utilities.utils import dict_keys_to_camel_case, to_camel_case
from ...constants import Game_Mode, Game_Sub_Menu, Locations


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
        if key in ['1', '2', '3', '4', '5', '6']:
            current_location = to_camel_case(self.location.value)
            requested_location = to_camel_case(
                self.game.game_manager.requested_location(key))
            if current_location != requested_location:
                # select new location
                self.game.game_manager.jet(key)
                updated_location = to_camel_case(self.location.value)
                # update prices
                self.game.prices.set_prices()
                updated_prices = dict_keys_to_camel_case(
                    self.game.prices.get_prices())
                # increment day
                self.game.game_manager.increment_day()
                updated_day = self.game.game_manager.day

                # increment debt
                self.game.shark.increment_debt()
                updated_debt = self.game.shark.get_debt_amount()

                # increment bank savings
                self.game.player.stash.increment_bank_savings()
                updated_bank = self.game.player.stash.get_amount('bank')

                # if heading to Florida, set game mode to manage inventory and sub menu to prompt for shark
                if requested_location == Locations.FLORIDA.value:
                    self.game.game_manager.set_game_sub_menu(
                        Game_Sub_Menu.PROMPT_FOR_SHARK)
                    self.game.game_manager.set_game_mode(
                        Game_Mode.MANAGE_INVENTORY)

                    updated_game_sub_menu = to_camel_case(
                        self.game.game_manager.get_game_sub_menu().value)

                else:
                    # update game state
                    random_number = random.randint(1, 100)
                    if random_number > 8:
                        # set number of stooges
                        self.game.chase.randomize_stooges(
                            self.game.game_manager.day)

                        # set game modes to start chase
                        self.game.game_manager.set_game_mode(
                            Game_Mode.CHASE)
                        self.game.game_manager.set_game_sub_menu(
                            Game_Sub_Menu.CHASE_START)
                        updated_game_sub_menu = to_camel_case(
                            self.game.game_manager.get_game_sub_menu().value)
                    else:
                        self.game.game_manager.set_game_mode(
                            Game_Mode.BUY_SELL_JET)
                        updated_game_sub_menu = ''

                updated_game_state = to_camel_case(
                    self.game.game_manager.get_game_mode().value)

                payload = {
                    'location': updated_location,
                    'prices': updated_prices,
                    'day': updated_day,
                    'gameState': updated_game_state,
                    'gameSubMenu': updated_game_sub_menu,
                    'debt': updated_debt,
                    'bank': updated_bank
                }
            # if same location is selected do not make changes to location, prices, interest or day
            else:
                self.game.game_manager.set_game_mode(Game_Mode.BUY_SELL_JET)
                updated_game_state = to_camel_case(
                    self.game.game_manager.get_game_mode().value)
                payload = {
                    'location': to_camel_case(self.location.value),
                    'prices': dict_keys_to_camel_case(
                        self.game.prices.get_prices()),
                    'day': self.game.game_manager.day,
                    'gameState': updated_game_state,
                    'debt': self.game.shark.get_debt_amount(),
                    'bank': self.game.player.stash.get_amount('bank')
                }
            return payload
        # if a key other than allowable keys is passed do not make changes to location, prices or day
        else:
            self.game.game_manager.set_game_mode(Game_Mode.BUY_SELL_JET)
            updated_game_state = to_camel_case(
                self.game.game_manager.get_game_mode().value)
            payload = {
                'location': to_camel_case(self.location.value),
                'prices': dict_keys_to_camel_case(
                    self.game.prices.get_prices()),
                'day': self.game.game_manager.day,
                'gameState': updated_game_state,
                'debt': self.game.shark.get_debt_amount()
            }
            return payload
