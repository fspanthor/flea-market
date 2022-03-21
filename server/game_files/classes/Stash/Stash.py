from ...constants import Game_Mode, Game_Sub_Menu
from ...utilities.utils import to_camel_case


class Stash():
    def __init__(self, game):
        self.fake_shoes = 0
        self.dvds = 0
        self.hot_sauce = 0
        self.switchblades = 0
        self.cell_phones = 0
        self.massage_chairs = 0
        self.bank = 0
        self.debt = 5500
        self.game = game

    def reset_stash(self):
        self.fake_shoes = 0
        self.dvds = 0
        self.hot_sauce = 0
        self.switchblades = 0
        self.cell_phones = 0
        self.massage_chairs = 0
        self.bank = 0
        self.debt = 5500

    def get_stash(self):
        return ({'fakeShoes': self.fake_shoes, 'dvds': self.dvds, 'hotSauce': self.hot_sauce,
                 'switchblades': self.switchblades, 'cellPhones': self.cell_phones, 'massageChairs': self.massage_chairs,
                 'bank': self.bank, 'debt': self.debt})

    def stash_continue(self, key):
        if key == 'y':
            self.game.game_manager.set_game_sub_menu(Game_Sub_Menu.STASH)
            return to_camel_case(self.game.game_manager.get_game_sub_menu().value)
        if key == 'n':
            self.game.game_manager.set_game_sub_menu(
                Game_Sub_Menu.PROMPT_FOR_BANK)
            return to_camel_case(self.game.game_manager.get_game_sub_menu().value)
        else:
            return to_camel_case(self.game.game_manager.get_game_sub_menu().value)

    def bank_continue(self, key):
        if key == 'y':
            self.game.game_manager.set_game_sub_menu(Game_Sub_Menu.BANK)
            return to_camel_case(self.game.game_manager.get_game_sub_menu().value)
        if key == 'n':
            # reset sub menu
            self.game.game_manager.set_game_sub_menu(
                '')
            # reset game mode to buy sell jet
            self.game.game_manager.set_game_mode(Game_Mode.BUY_SELL_JET)

            sub_menu = self.game.game_manager.get_game_sub_menu()
            game_mode = to_camel_case(
                self.game.game_manager.get_game_mode().value)

            payload = {
                'subMenu': sub_menu,
                'gameState': game_mode
            }
            return payload
        else:
            return to_camel_case(self.game.game_manager.get_game_sub_menu().value)
