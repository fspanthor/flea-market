
import math


class Game():
    def __init__(self):
        self.player = Player(self)
        self.location = Location()
        self.prices = Prices()


class Player():
    def __init__(self, game):
        self.game = game
        self.trench_coat = Trench_Coat()
        self.stash = Stash()

    def check_maximum_buy(self, item):
        current_money = self.trench_coat.get_amount('money')
        current_item_price = self.game.prices.get_item_price(item)
        return math.floor(current_money/current_item_price) if current_item_price else 0


class Trench_Coat():
    def __init__(self):
        self.nachos = 0
        self.dvds = 0
        self.hotSauce = 0
        self.pocket_knives = 0
        self.cell_phones = 0
        self.golf_carts = 0
        self.money = 0

    def get_amount(self, item):
        if hasattr(self, item):
            return getattr(self, item)

    def add_inventory(self, item, amount):
        if hasattr(self, item):
            new_amount = getattr(self, item) + amount
            setattr(self, item, new_amount)

    def change_wallet(self, money, amount_change):
        self.money = money + amount_change
        return self.money


class Stash():
    def __init__(self):
        self.nachos = 0
        self.dvds = 0
        self.hotSauce = 0
        self.pocket_knives = 0
        self.cell_phones = 0
        self.golf_carts = 0
        self.money = 0

    def get_amount(self, item):
        if hasattr(self, item):
            return getattr(self, item)

    def add_inventory(self, item, amount):
        if hasattr(self, item):
            new_amount = getattr(self, item) + amount
            setattr(self, item, new_amount)

    def stash(self, money, amount_change):
        self.money = money + amount_change
        return self.money


class Prices():
    def __init__(self):
        self.nachos = 0
        self.dvds = 0
        self.hotSauce = 0
        self.pocket_knives = 0
        self.cell_phones = 0
        self.golf_carts = 0

    def set_prices(self):
        #10 - 60
        self.nachos = 10
        #70 -250
        self.dvds = 70
        #300 - 900
        self.hotSauce = 300
        #1000 - 4500
        self.pocket_knives = 1000
        #5000 - 14000
        self.cell_phones = 5000
        #15000 - 30000
        self.golf_carts = 15000

    def get_item_price(self, item):
        if hasattr(self, item):
            return getattr(self, item)

    def get_prices(self):
        return self.__dict__


class Location():
    def __init__(self):
        self.location = ''

    def set_location(self, location):
        if hasattr(self, location):
            setattr(self, location)
            return getattr(self, location)


def get_location(self):
    return getattr(self, 'location')
