
import random

from ...classes.Prices.Prices import Price_Limit
from ...constants import Game_Mode, Game_Sub_Menu, Locations
from ...utilities.utils import randomize, to_camel_case


class Event():
    def __init__(self, game):
        self.game = game

    def heal(self):
        current_cash = self.game.player.trench_coat.cash

        # reset health
        # subtract cost
        if (current_cash >= 4000):
            self.game.player.trench_coat.subtract_cash(4000)
            self.game.chase.reset_health()

        return self.game.chase.exit_chase()

    def random_event(self):
        event_functions = [self.game.event.sale_event,
                           self.game.event.surge_event]

        # pick random event
        number_of_events = len(event_functions)
        event_id = random.randint(0, number_of_events - 1)
        function = event_functions[event_id]
        return function()

    def sale_event(self):
        prices = self.game.prices

        sale_item = random.randint(1, 6)
        if sale_item == 1:
            prices.dvds = randomize(
                int(Price_Limit.DVDS_LOW/4), int(Price_Limit.DVDS_HIGH/4))
            item = 'DVDS'
        if sale_item == 2:
            prices.hot_sauce = randomize(
                int(Price_Limit.HOT_SAUCE_LOW/4), int(Price_Limit.HOT_SAUCE_HIGH/4))
            item = 'HOT SAUCE'
        if sale_item == 3:
            prices.switchblades = self.switchblades = randomize(
                int(Price_Limit.SWITCHBLADES_LOW/4), int(Price_Limit.SWITCHBLADES_HIGH/4))
            item = 'SWITCHBLADES'
        if sale_item == 4:
            prices.fake_shoes = randomize(
                int(Price_Limit.FAKE_SHOES_LOW/4), int(Price_Limit.FAKE_SHOES_HIGH/4))
            item = 'FAKE SHOES'
        if sale_item == 5:
            prices.cell_phones = randomize(
                int(Price_Limit.CELL_PHONES_LOW/2), int(Price_Limit.CELL_PHONES_HIGH/2))
            item = 'CELL PHONES'
        if sale_item == 6:
            prices.massage_chairs = randomize(
                int(Price_Limit.GOLF_CARTS_LOW/2), int(Price_Limit.GOLF_CARTS_HIGH/2))
            item = 'MASSAGE CHAIRS'
        system_message = f'A TATTED UP 13 YEAR OLD IS SELLING CHEAP {item} OUT OF HIS VAN.. DONT ASK QUESTIONS!!'
        return system_message

    def surge_event(self):
        prices = self.game.prices

        surge_item = random.randint(1, 6)
        if surge_item == 1:
            prices.dvds = randomize(
                int(Price_Limit.DVDS_LOW*4), int(Price_Limit.DVDS_HIGH*4))
            item = 'DVDS'
        if surge_item == 2:
            prices.hot_sauce = randomize(
                int(Price_Limit.HOT_SAUCE_LOW*4), int(Price_Limit.HOT_SAUCE_HIGH*4))
            item = 'HOT SAUCE'
        if surge_item == 3:
            prices.switchblades = self.switchblades = randomize(
                int(Price_Limit.SWITCHBLADES_LOW*4), int(Price_Limit.SWITCHBLADES_HIGH*4))
            item = 'SWITCHBLADES'
        if surge_item == 4:
            prices.fake_shoes = randomize(
                int(Price_Limit.FAKE_SHOES_LOW*4), int(Price_Limit.FAKE_SHOES_HIGH*4))
            item = 'FAKE SHOES'
        if surge_item == 5:
            prices.cell_phones = randomize(
                int(Price_Limit.CELL_PHONES_LOW*2), int(Price_Limit.CELL_PHONES_HIGH*2))
            item = 'CELL PHONES'
        if surge_item == 6:
            prices.massage_chairs = randomize(
                int(Price_Limit.GOLF_CARTS_LOW*2), int(Price_Limit.GOLF_CARTS_HIGH*2))
            item = 'MASSAGE CHAIRS'
        system_message = f'LOCALS ARE BUYING {item} AT OUTRAGEOUS PRICES HERE!!'
        return system_message

    def event_continue(self):

        # if location is florida show inventory prompts
        if self.game.location.get_location().value == Locations.FLORIDA.value:
            self.game.game_manager.set_game_sub_menu(
                Game_Sub_Menu.PROMPT_FOR_SHARK)
            self.game.game_manager.set_game_mode(
                Game_Mode.MANAGE_INVENTORY)

            payload = {
                'gameState': to_camel_case(self.game.game_manager.get_game_mode().value),
                'gameSubMenu': to_camel_case(self.game.game_manager.get_game_sub_menu().value),
            }
            return payload
        else:
            self.game.game_manager.set_game_sub_menu('')
            self.game.game_manager.set_game_mode(Game_Mode.BUY_SELL_JET)

            payload = {
                'gameState': to_camel_case(self.game.game_manager.get_game_mode().value),
                'gameSubMenu': '',
            }
            return payload
