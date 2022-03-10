
from enum import Enum


class Game_Mode(Enum):
    SHARK_BANK_STASH = 'shark_bank_stash'
    BUY_SELL_JET = 'buy_sell_jet'
    BUY = 'buy'
    BUY_HOW_MUCH = 'buy_how_much'
    SELL = 'sell'
    SELL_HOW_MUCH = 'sell_how_much'
    JET = 'jet'
    INSTRUCTIONS = 'instructions'
    INIT = 'init'


class Play_Mode(Enum):
    GAME_START = 'game_start'


class Locations(Enum):
    BRONX = 'bronx',
    FLORIDA = 'florida'
