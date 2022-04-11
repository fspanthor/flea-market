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

    def get_amount(self, item):
        if hasattr(self, item):
            return getattr(self, item)

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
            game_mode = to_camel_case(
                self.game.game_manager.get_game_mode().value)

            sub_menu = to_camel_case(
                self.game.game_manager.get_game_sub_menu().value)
            payload = {
                'gameSubMenu': sub_menu,
                'gameState': game_mode
            }
            return payload
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
                'gameSubMenu': sub_menu,
                'gameState': game_mode
            }
            return payload
        else:
            game_mode = to_camel_case(
                self.game.game_manager.get_game_mode().value)

            sub_menu = to_camel_case(
                self.game.game_manager.get_game_sub_menu().value)
            payload = {
                'gameSubMenu': sub_menu,
                'gameState': game_mode
            }
            return payload

    def deposit_to_bank(self, amount):
        starting_cash = self.game.player.trench_coat.get_amount('cash')

        if amount <= starting_cash:

            # add to bank
            self.bank += amount

            # subtract from cash
            self.game.player.trench_coat.subtract_cash(amount)

            # update game state
            self.game.game_manager.set_game_sub_menu(
                Game_Sub_Menu.BANK_WITHDRAW)

            updated_bank = self.bank
            updated_cash = self.game.player.trench_coat.get_amount('cash')
            updated_game_sub_menu = to_camel_case(
                self.game.game_manager.get_game_sub_menu().value)

            payload = {
                'bank': updated_bank,
                'cash': updated_cash,
                'gameSubMenu': updated_game_sub_menu
            }
            return payload
        else:
            # change game state
            # update game state
            self.game.game_manager.set_game_sub_menu(
                Game_Sub_Menu.BANK_WITHDRAW)
            updated_game_sub_menu = to_camel_case(
                self.game.game_manager.get_game_sub_menu().value)

            payload = {
                'bank': self.bank,
                'cash': self.game.player.trench_coat.get_amount('cash'),
                'gameSubMenu': updated_game_sub_menu
            }
            return payload

    def withdraw_from_bank(self, amount):
        starting_bank = self.bank

        if amount <= starting_bank:

            # subtract from bank
            self.bank -= amount

            # add to cash
            self.game.player.trench_coat.add_cash(amount)

            # reset sub menu
            self.game.game_manager.set_game_sub_menu(
                '')
            # reset game mode to buy sell jet
            self.game.game_manager.set_game_mode(Game_Mode.BUY_SELL_JET)

            updated_bank = self.bank
            updated_cash = self.game.player.trench_coat.get_amount('cash')
            sub_menu = self.game.game_manager.get_game_sub_menu()
            game_mode = to_camel_case(
                self.game.game_manager.get_game_mode().value)

            payload = {
                'bank': updated_bank,
                'cash': updated_cash,
                'gameSubMenu': sub_menu,
                'gameState': game_mode
            }
            return payload
        else:
           # reset sub menu
            self.game.game_manager.set_game_sub_menu(
                '')
            # reset game mode to buy sell jet
            self.game.game_manager.set_game_mode(Game_Mode.BUY_SELL_JET)

            sub_menu = self.game.game_manager.get_game_sub_menu()
            game_mode = to_camel_case(
                self.game.game_manager.get_game_mode().value)

            payload = {
                'bank': self.bank,
                'cash': self.game.player.trench_coat.get_amount('cash'),
                'gameSubMenu': sub_menu,
                'gameState': game_mode
            }
            return payload

    def add_to_stash(self, item, amount):
        if hasattr(self, item):
            new_amount = getattr(self, item) + amount
            setattr(self, item, new_amount)

    def subtract_from_stash(self, item, amount):
        if hasattr(self, item):
            new_amount = getattr(self, item) - amount
            setattr(self, item, new_amount)

    def increment_bank_savings(self):
        new_bank = round(self.bank * 1.04/10)*10
        self.bank = new_bank
