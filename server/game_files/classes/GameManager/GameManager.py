from ...utilities.utils import get_item_for_key, to_camel_case
from ...constants import Game_Mode, Locations, Game_Sub_Menu


class GameManager():
    def __init__(self, game):
        self.day = 1
        self.game_mode = Game_Mode.INIT
        self.game_sub_menu = ''
        self.game = game
        self.current_item = ''
        self.staged_amount = 0
        self.staged_price = 0
        self.system_message = ''

    def new_game(self):
        self.day = 1
        self.game_mode = Game_Mode.INIT
        self.game_sub_menu = ''
        self.current_item = ''
        self.system_message = ''
        self.staged_amount = 0
        self.staged_price = 0
        self.game.location.set_location(Locations.FLORIDA)
        self.game.prices.set_prices()
        self.game.player.stash.reset_stash()
        self.game.player.trench_coat.reset_trench_coat()
        self.game.shark.reset_shark()
        self.game.chase.reset_chase()
        return self.game_mode.value

    def set_current_item(self, current_item):
        setattr(self, 'current_item', current_item)
        return getattr(self, 'current_item')

    def set_staged_amount(self, amount):
        setattr(self, 'staged_amount', amount)
        return

    def set_staged_price(self, price):
        setattr(self, 'staged_price', price)
        return

# when current item resets its needs to be empty string
# there are times when an empty current_item can be submitted via request.. cant be None
    def reset_current_item(self):
        setattr(self, 'current_item', '')
        return

    def get_current_item(self):
        return getattr(self, 'current_item')

    def get_staged_amount(self):
        return getattr(self, 'staged_amount')

    def get_staged_price(self):
        return getattr(self, 'staged_price')

    def reset_staged_amount(self):
        setattr(self, 'staged_amount', 0)
        return

    def reset_staged_price(self):
        setattr(self, 'staged_price', 0)
        return

    def game_over(self):
        self.set_game_mode(Game_Mode.GAME_OVER)
        self.set_game_sub_menu(Game_Sub_Menu.CLEAR)
        payload = {
            'gameState': to_camel_case(self.game.game_manager.get_game_mode().value),
            'gameSubMenu': ''}
        return payload

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
        if key == 'b' or key == 'B':
            self.set_game_mode(Game_Mode.BUY)
            return self.get_game_mode().value
        if key == 's' or key == 'S':
            self.set_game_mode(Game_Mode.SELL)
            return self.get_game_mode().value
        if key == 'j' or key == 'J':
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

    def set_game_sub_menu(self, new_sub_menu):
        setattr(self, 'game_sub_menu', new_sub_menu)

    def get_game_sub_menu(self):
        return getattr(self, 'game_sub_menu')
