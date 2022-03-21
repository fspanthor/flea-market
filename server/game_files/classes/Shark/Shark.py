from ...constants import Game_Sub_Menu
from ...utilities.utils import to_camel_case


class Shark ():
    def __init__(self, game):
        self.debt = 5500
        self.game_manager = game.game_manager

    def reset_shark(self):
        self.debt = 5500

    def pay_back_shark(self, amount):
        self.debt -= amount
        return self.debt

    def borrow_from_shark(self, amount):
        self.debt += amount
        return self.debt

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
