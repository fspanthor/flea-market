from ...db.pymongo_connection import check_high_score, insert_high_score, retrieve_high_scores
from ...utilities.utils import get_item_for_key, to_camel_case
from ...constants import Game_Mode, Locations, Game_Sub_Menu


class GameManager():
    def __init__(self, game):
        self.day = 29
        self.game_mode = Game_Mode.INIT
        self.game_sub_menu = ''
        self.game = game
        self.current_item = ''
        self.staged_amount = 0
        self.staged_price = 0
        self.system_message = ''

    def new_game(self):
        self.day = 29
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
        current_day = self.game.game_manager.day
        current_debt = self.game.shark.debt
        current_score = self.game.player.stash.bank + self.game.player.trench_coat.cash
        #high_score = check_high_score(current_score)

        # if day is 30, current debt is 0 and high score is true, go to high score submit
        # add high core here
        # if (current_day >= 30 and current_debt <= 0):
        self.set_game_sub_menu(Game_Sub_Menu.HIGH_SCORE)

        # # if day is 30, current debt is 0 and high score is false, show win screen without submit
        # # add high core here
        # if (current_day >= 30 and current_debt <= 0):
        #     self.set_game_sub_menu(Game_Sub_Menu.WIN)

        # # if day is 30 but debt is > 0 just send game over
        # if (current_day >= 30 and current_debt > 0):
        #     self.set_game_sub_menu(Game_Sub_Menu.CLEAR)

        # # if player did not finish game just send game over
        # if (current_day < 30):
        #     self.set_game_sub_menu(Game_Sub_Menu.CLEAR)

        # self.set_game_sub_menu(Game_Sub_Menu.CLEAR)

        payload = {
            'gameState': to_camel_case(self.game.game_manager.get_game_mode().value),
            'gameSubMenu': to_camel_case(self.game.game_manager.get_game_sub_menu().value)}
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

    def persist_high_score(self, value):
        player_score = self.game.player.stash.bank + self.game.player.trench_coat.cash
        insert_high_score(value, player_score)
        return self.restart_game()

    def restart_game(self):
        self.new_game()
        payload = {
            'gameState': to_camel_case(self.new_game()),
        }
        return payload

    def get_high_scores(self, amount):
        scores = retrieve_high_scores(amount)
        return scores
