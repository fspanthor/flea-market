
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
    MANAGE_INVENTORY = 'manage_inventory'


class Game_Sub_Menu(Enum):
    PROMPT_FOR_SHARK = 'prompt_for_shark'
    PROMPT_FOR_STASH = 'prompt_for_stash'
    PROMPT_FOR_BANK = 'prompt_for_bank'
    SHARK = 'shark'
    SHARK_BORROW = "shark_borrow"
    STASH = 'stash'
    BANK = 'bank'


class Play_Mode(Enum):
    GAME_START = 'game_start'


class Locations(Enum):
    FLORIDA = 'florida'
    ASHBY_BART = 'ashby_bart'
    SAN_JOSE_SUPER_MALL = 'san_jose_super_mall'
    SOLANO_SWAP_MEET = 'solano_swap_meet'
    COMMUNITY_COLLEGE_FLEA_MARKET = 'community_college_flea_market'
    HAUNTED_MALL = 'haunted_mall'


class Items(Enum):
    DVDS = 'dvds'
    HOT_SAUCE = 'hot_sauce'
    SWITCHBLADES = 'switchblades'
    FAKE_SHOES = 'fake_shoes'
    CELL_PHONES = 'cell_phones'
    MASSAGE_CHAIRS = 'massage_chairs'


allowable_items = ([Items.DVDS.value, Items.HOT_SAUCE.value, Items.SWITCHBLADES.value,
                    Items.FAKE_SHOES.value, Items.CELL_PHONES.value, Items.MASSAGE_CHAIRS.value])
