from ...utilities.utils import get_item_for_key, to_camel_case
from ...constants import Game_Mode, Locations


class GameManager():
    def __init__(self, game):
        self.day = 1
        self.game_mode = Game_Mode.INIT
        self.game = game
        self.current_item = ''

    def new_game(self):
        self.day = 1
        self.game_mode = Game_Mode.INIT.value
        self.current_item = ''
        self.game.location.set_location(Locations.FLORIDA)
        self.game.prices.set_prices()
        self.game.player.stash.reset_stash()
        self.game.player.trench_coat.reset_trench_coat()
        return self.game_mode

    def set_current_item(self, current_item):
        setattr(self, 'current_item', current_item)
        return getattr(self, 'current_item')

# when current item resets its needs to be empty string
# there are times when an empty current_item can be submitted via request.. cant be None
    def reset_current_item(self):
        setattr(self, 'current_item', '')

    def get_current_item(self):
        return getattr(self, 'current_item')

# set current item and return in camel case
    def stage_current_item(self, key):
        item = get_item_for_key(key)
        current_item = self.set_current_item(item)
        return to_camel_case(current_item)

    def get_day(self):
        return getattr(self, 'day')

    def increment_day(self):
        self.day = self.day + 1

    def buy_sell_jet(self, key):
        if key == 'b':
            self.set_game_mode(Game_Mode.BUY)
            return self.get_game_mode().value
        if key == 's':
            self.set_game_mode(Game_Mode.SELL)
            return self.get_game_mode().value
        if key == 'j':
            self.set_game_mode(Game_Mode.JET)
            return self.get_game_mode().value
        else:
            return self.get_game_mode().value

    def jet(self, key):
        if key == '1':
            self.game.location.set_location(Locations.FLORIDA)
        if key == '2':
            self.game.location.set_location(Locations.ASHBY_BART)
        if key == '3':
            self.game.location.set_location(
                Locations.SAN_JOSE_SUPER_MALL)
        if key == '4':
            self.game.location.set_location(Locations.SOLANO_SWAP_MEET)
        if key == '5':
            self.game.location.set_location(
                Locations.COMMUNITY_COLLEGE_FLEA_MARKET)
        if key == '6':
            self.game.location.set_location(Locations.HAUNTED_MALL)

    def requested_location(self, key):
        if key == '1':
            return Locations.FLORIDA.value
        if key == '2':
            return Locations.ASHBY_BART.value
        if key == '3':
            return Locations.SAN_JOSE_SUPER_MALL.value
        if key == '4':
            return Locations.SOLANO_SWAP_MEET.value
        if key == '5':
            return Locations.COMMUNITY_COLLEGE_FLEA_MARKET.value
        if key == '6':
            return Locations.HAUNTED_MALL.value

    def get_game_mode(self):
        return getattr(self, 'game_mode')

    def set_game_mode(self, new_mode):
        setattr(self, 'game_mode', new_mode)

    def get_game_state(self):
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
