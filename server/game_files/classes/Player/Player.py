import math

from ...constants import Game_Mode, allowable_items

from ...utilities.utils import get_item_for_key, to_camel_case, to_snake_case
from ..Stash.Stash import Stash
from ..TrenchCoat.TrenchCoat import TrenchCoat


class Player():
    def __init__(self, game):
        self.game = game
        self.trench_coat = TrenchCoat()
        self.stash = Stash()

    def check_maximum_buy(self, key):
        item = get_item_for_key(key)

        current_money = self.trench_coat.get_amount('cash')
        current_item_price = self.game.prices.get_item_price(item)

        # maximum buy is not stored on server because it can be derived during buy
        maximum_buy = math.floor(
            current_money/current_item_price) if current_item_price else 0

        current_item = to_camel_case(
            self.game.game_manager.set_current_item(item))

        return {'maximumBuy': maximum_buy,
                'currentItem': current_item
                }

    def buy_item(self, item, amount):

        # convert item to snake_case
        item_to_buy = to_snake_case(item)
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

                # reset current item
                self.game.game_manager.reset_current_item()

                payload = {
                    'trenchCoat': self.trench_coat.get_trench_coat(),
                    'maximumBuy': None,
                    'currentItem': self.game.game_manager.get_current_item(),
                    'gameState': to_camel_case(self.game.game_manager.game_mode.value)
                }
                return payload
            # not enough money or not enough space in hold
            else:
                self.game.game_manager.reset_current_item()
                self.game.game_manager.set_game_mode(Game_Mode.BUY_SELL_JET)
                payload = {
                    'trenchCoat': self.trench_coat.get_trench_coat(),
                    'maximumBuy': None,
                    'currentItem': self.game.game_manager.get_current_item(),
                    'gameState': to_camel_case(self.game.game_manager.game_mode.value)
                }
                return payload
        else:
            self.game.game_manager.reset_current_item()
            self.game.game_manager.set_game_mode(Game_Mode.BUY_SELL_JET)
            payload = {
                'trenchCoat': self.trench_coat.get_trench_coat(),
                'maximumBuy': None,
                'currentItem': self.game.game_manager.get_current_item(),
                'gameState': to_camel_case(self.game.game_manager.game_mode.value)
            }
            return payload

    def sell_item(self, item, amount):

        # convert item to snake_case
        item_to_sell = to_snake_case(item)
        total_sellable = self.trench_coat.get_amount(item_to_sell)

        if ((item_to_sell in allowable_items) and (amount <= total_sellable)):

            # subtract inventory
            self.trench_coat.subtract_inventory(item_to_sell, amount)

            # add to hold
            self.trench_coat.max_hold += amount

            # add profit
            total_profit = self.game.prices.get_item_price(
                item_to_sell) * amount
            self.trench_coat.add_cash(total_profit)

            # set to buy sell jet
            self.game.game_manager.set_game_mode(Game_Mode.BUY_SELL_JET)

            # reset current item
            self.game.game_manager.reset_current_item()

            payload = {
                'trenchCoat': self.trench_coat.get_trench_coat(),
                'maximumBuy': None,
                'currentItem': self.game.game_manager.get_current_item(),
                'gameState': to_camel_case(self.game.game_manager.game_mode.value)
            }
            return payload
        else:
            # if item to sell is not allowable, or amount to sell is too low, reset sell prompt
            self.game.game_manager.reset_current_item()
            payload = {
                'trenchCoat': self.trench_coat.get_trench_coat(),
                'maximumBuy': None,
                'currentItem': self.game.game_manager.get_current_item(),
                'gameState': to_camel_case(self.game.game_manager.game_mode.value)
            }
            return payload
