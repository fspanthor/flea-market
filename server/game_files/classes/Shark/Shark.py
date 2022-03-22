from ...constants import Game_Sub_Menu
from ...utilities.utils import to_camel_case


class Shark ():
    def __init__(self, game):
        self.debt = 5500
        self.game = game
        self.game_manager = game.game_manager

    def reset_shark(self):
        self.debt = 5500

    def repay_shark(self, amount):
        # subtract debt amount
        self.debt -= amount
        updated_debt = self.get_debt_amount()
        # subtract amount from trench coat
        self.game.player.trench_coat.subtract_cash(amount)
        updated_cash = self.game.player.trench_coat.get_amount('cash')
        # change game state
        self.game_manager.set_game_sub_menu(Game_Sub_Menu.SHARK_BORROW)
        updated_sub_game_mode = to_camel_case(
            self.game_manager.get_game_sub_menu().value)

        payload = {
            'debt': updated_debt,
            'cash': updated_cash,
            'gameSubMenu': updated_sub_game_mode
        }
        return payload

    def borrow_from_shark(self, amount):
        # subtract debt amount
        self.debt += amount
        updated_debt = self.get_debt_amount()
        # subtract amount from trench coat
        self.game.player.trench_coat.add_cash(amount)
        updated_cash = self.game.player.trench_coat.get_amount('cash')
        # change game state
        self.game_manager.set_game_sub_menu(Game_Sub_Menu.PROMPT_FOR_STASH)
        updated_sub_game_mode = to_camel_case(
            self.game_manager.get_game_sub_menu().value)

        payload = {
            'debt': updated_debt,
            'cash': updated_cash,
            'gameSubMenu': updated_sub_game_mode
        }
        return payload

    def increment_debt(self):
        new_debt = round(self.debt * 1.08/10)*10
        self.debt = new_debt

    def get_debt_amount(self):
        return self.debt

    def get_shark(self):
        return self.__dict__

    def shark_continue(self, key):
        if key == 'y':
            self.game_manager.set_game_sub_menu(Game_Sub_Menu.SHARK)
            return to_camel_case(self.game_manager.get_game_sub_menu().value)
        if key == 'n':
            self.game_manager.set_game_sub_menu(Game_Sub_Menu.PROMPT_FOR_STASH)
            return to_camel_case(self.game_manager.get_game_sub_menu().value)
        else:
            return to_camel_case(self.game_manager.get_game_sub_menu().value)
