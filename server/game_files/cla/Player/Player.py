import math
from ..Stash.Stash import Stash
from ..TrenchCoat.TrenchCoat import TrenchCoat


class Player():
    def __init__(self, game):
        self.game = game
        self.trench_coat = TrenchCoat()
        self.stash = Stash()

    def check_maximum_buy(self, item):
        current_money = self.trench_coat.get_amount('money')
        current_item_price = self.game.prices.get_item_price(item)
        return math.floor(current_money/current_item_price) if current_item_price else 0
