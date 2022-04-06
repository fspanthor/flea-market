import random

from ...utilities.utils import to_camel_case
from ...constants import Game_Mode, Game_Sub_Menu, Utility_Items


class Chase():
    def __init__(self, game):
        self.health = 100
        self.stooges = 10
        self.game = game

    def reset_chase(self):
        self.health = 100
        self.stooges = 0

    def get_chase(self):
        payload = {
            'health': self.health,
            'stooges': self.stooges
        }
        return payload

    def start_chase(self):
        corn_dogs = self.game.player.trench_coat.get_amount(
            Utility_Items.CORN_DOGS.value)

        if corn_dogs > 0:
            return to_camel_case(Game_Sub_Menu.RUN_OR_BRIBE.value)
        else:
            return to_camel_case(Game_Sub_Menu.RUN.value
                                 )

    def reset_stooges(self):
        self.stooges = 0

    def subtract_health(self, amount):
        self.health -= amount
        return self.health

    def add_health(self, amount):
        self.health += amount
        return self.health

    def set_stooges(self, number):
        setattr(self, 'stooges', number)
        return getattr(self, 'stooges')

    def run(self):
        random_number = random.randint(1, 100)
        if random_number > 50:
            self.game.game_manager.set_game_sub_menu(Game_Sub_Menu.GOT_AWAY)
            payload = {
                'chase': {'health': self.health,
                          'stooges': self.set_stooges(0)},
                'gameSubMenu': to_camel_case(self.game.game_manager.get_game_sub_menu().value),
                'systemMessage': ''
            }
            return payload
        else:
            total_damage = 0

            for _ in range(self.stooges):
                damage = random.randint(0, 1)
                amount = self.stooges * damage
                total_damage += amount

            self.subtract_health(total_damage)
            self.game.game_manager.set_game_sub_menu(
                Game_Sub_Menu.DIDNT_GET_AWAY)
            payload = {
                'chase': {'health': self.health,
                          'stooges': self.stooges},
                'gameSubMenu': to_camel_case(self.game.game_manager.get_game_sub_menu().value),
                'systemMessage': f'YOU TOOK {total_damage} DAMAGE'
            }
            return payload

    def exit_chase(self):
        self.reset_stooges()
        self.game.game_manager.set_game_sub_menu('')
        self.game.game_manager.set_game_mode(Game_Mode.BUY_SELL_JET)

        payload = {
            'gameState': to_camel_case(self.game.game_manager.get_game_mode().value),
            'gameSubMenu': '',
        }
        return payload

    def run_or_bribe(self, key):
        if key == 'r':
            return self.run()
        else:
            self.game.game_manager.set_game_sub_menu(
                Game_Sub_Menu.DIDNT_GET_AWAY)
            payload = {
                'chase': {'health': self.health,
                          'stooges': self.stooges},
                'gameSubMenu': to_camel_case(self.game.game_manager.get_game_sub_menu().value),
                'systemMessage': ''
            }
            return payload
