
import math
from enum import Enum


class Game():
    def __init__(self):
        self.player = Player(self)
        self.location = Location()
        self.prices = Prices()
        self.game_manager = Game_Manager(self)


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


class Locations(Enum):
    BRONX = 'bronx',
    FLORIDA = 'florida'


class Location():
    def __init__(self):
        self.location = Locations.BRONX

    def set_location(self, location):
        if hasattr(self, location):
            setattr(self, location)
            return getattr(self, location)

    def get_location(self):
        return getattr(self, 'location')


class Game_Manager():
    def __init__(self, game):
        self.day = 0
        self.game_mode = ''
        self.game = game

    def game_state(self):
        if self.day == 30:
            return 'game over'
        if self.game.location.get_location() == Locations.BRONX:
            self.game_mode = Game_Mode.SHARK_BANK_STASH
            return 'prompt for shark, ask for bank, ask for stash'
        if self.game_mode == Game_Mode.SHARK_BANK_STASH:
            return 'prompt for shark bank stash'
        if self.game_mode == Game_Mode.BUY_SELL_JET:
            return 'prompt for buy sell jet'
        if self.game_mode == Game_Mode.BUY:
            return 'prompt for what will you buy'
        if self.game_mode == Game_Mode.BUY_HOW_MUCH:
            return 'prompt for buy how much'
        if self.game_mode == Game_Mode.SELL:
            return 'prompt for what will you buy'
        if self.game_mode == Game_Mode.SELL_HOW_MUCH:
            return 'prompt for buy how much'
        if self.game_mode == Game_Mode.JET:
            return 'prompt for where to jet'
        else:
            return 'test'


class Game_Mode(Enum):
    SHARK_BANK_STASH = 'shark_bank_stash'
    BUY_SELL_JET = 'buy_sell_jet'
    BUY = 'buy'
    BUY_HOW_MUCH = 'buy_how_much'
    SELL = 'sell'
    SELL_HOW_MUCH = 'sell_how_much'
    JET = 'jet'
