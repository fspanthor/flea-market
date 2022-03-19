import math

from ...constants import Game_Mode, Items, allowable_items

from ...utilities.utils import dict_keys_to_camel_case, to_camel_case, to_snake_case
from ..Stash.Stash import Stash
from ..TrenchCoat.TrenchCoat import TrenchCoat


class Player():
    def __init__(self, game):
        self.game = game
        self.trench_coat = TrenchCoat()
        self.stash = Stash()

    def check_maximum_buy(self, key):
        # this is a safety measure in case a bad character makes it to this function
        if key != 'd' or 'h' or 's' or 'f' or 'c' or 'm':
            print('setting dvd')
            item = Items.DVDS.value

        if key == 'd':
            item = Items.DVDS.value
        if key == 'h':
            item = Items.HOT_SAUCE.value
        if key == 's':
            item = Items.SWITCHBLADES.value
        if key == 'f':
            item = Items.FAKE_SHOES.value
        if key == 'c':
            item = Items.CELL_PHONES.value
        if key == 'm':
            item = Items.MASSAGE_CHAIRS.value

        current_money = self.trench_coat.get_amount('cash')
        current_item_price = self.game.prices.get_item_price(item)
        maximum_buy = math.floor(
            current_money/current_item_price) if current_item_price else 0
        current_item = to_camel_case(item)
        return {'maximumBuy': maximum_buy,
                'currentItem': current_item
                }

    def buy_item(self, item, amount):

        # convert item to snake_case
        item_to_buy = to_snake_case(item)
        print(item)
        # check requested item exists
        if item_to_buy in allowable_items:

            # check if player can afford amount
            total_cost = self.game.prices.get_item_price(
                item_to_buy) * amount
            current_cash = self.trench_coat.cash

            if (current_cash >= total_cost) and (amount < self.trench_coat.max_hold):
                # add inventory
                self.trench_coat.add_inventory(item_to_buy, amount)

                # subtract from hold
                self.trench_coat.max_hold -= amount

                # subtract cost
                self.trench_coat.subtract_cash(total_cost)

                # set to buy sell jet
                self.game.game_manager.set_game_mode(Game_Mode.BUY_SELL_JET)

                payload = {
                    'trenchCoat': dict_keys_to_camel_case(self.trench_coat.get_trench_coat()),
                    'maximumBuy': None,
                    'currentItem': '',
                    'gameState': to_camel_case(self.game.game_manager.game_mode.value)
                }
                return payload
            # not enough money or not enough space in hold
            else:
                self.game.game_manager.set_game_mode(Game_Mode.BUY_SELL_JET)
                print('not enough money')
                payload = {
                    'trenchCoat': dict_keys_to_camel_case(self.trench_coat.get_trench_coat()),
                    'maximumBuy': None,
                    'currentItem': '',
                    'gameState': to_camel_case(self.game.game_manager.game_mode.value)
                }
                return payload
        else:
            payload = {
                'trenchCoat': dict_keys_to_camel_case(self.trench_coat.get_trench_coat()),
                'maximumBuy': None,
                'currentItem': '',
                'gameState': to_camel_case(self.game.game_manager.game_mode.value)
            }
            return payload
