import random

from ...utilities.utils import dict_keys_to_camel_case, to_camel_case
from ...constants import Game_Mode, Game_Sub_Menu, Locations, Utility_Items


class Chase():
    def __init__(self, game):
        self.health = 100
        self.stooges = 0
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
            self.game.game_manager.set_game_sub_menu(
                Game_Sub_Menu.RUN_OR_BRIBE)

        if corn_dogs == 0:
            self.game.game_manager.set_game_sub_menu(Game_Sub_Menu.RUN)

        print(self.game.game_manager.get_game_mode())

        payload = {
            'gameState': to_camel_case(self.game.game_manager.get_game_mode().value),
            'gameSubMenu': to_camel_case(self.game.game_manager.get_game_sub_menu().value)
        }
        return payload

    def exit_chase(self):
        self.reset_stooges()

        # check if random event will happen after chase
        random_number_for_event = random.randint(1, 100)
        if random_number_for_event < 50:
            # clear sub menu
            # it may be re-set during random event
            self.game.game_manager.set_game_sub_menu(Game_Sub_Menu.CLEAR)
            system_message = self.game.event.random_event()
            self.game.game_manager.set_game_mode(
                Game_Mode.EVENT)

            updated_prices = dict_keys_to_camel_case(
                self.game.prices.get_prices())
            updated_game_sub_menu = to_camel_case(
                self.game.game_manager.get_game_sub_menu().value)
            updated_game_state = to_camel_case(
                self.game.game_manager.get_game_mode().value)
            updated_location = to_camel_case(
                self.game.location.get_location().value)
            updated_day = self.game.game_manager.day
            updated_debt = self.game.shark.get_debt_amount()
            updated_bank = self.game.player.stash.get_amount('bank')
            updated_trench_coat = self.game.player.trench_coat.get_trench_coat()

            payload = {
                'location': updated_location,
                'prices': updated_prices,
                'day': updated_day,
                'gameState': updated_game_state,
                'gameSubMenu': updated_game_sub_menu,
                'debt': updated_debt,
                'bank': updated_bank,
                'systemMessage': system_message,
                'trenchCoat': updated_trench_coat
            }
            return payload

        # if next location is florida, show manage inventory stuff
        if self.game.location.get_location().value == Locations.FLORIDA.value:
            self.game.game_manager.set_game_sub_menu(
                Game_Sub_Menu.PROMPT_FOR_SHARK)
            self.game.game_manager.set_game_mode(
                Game_Mode.MANAGE_INVENTORY)

            payload = {
                'gameState': to_camel_case(self.game.game_manager.get_game_mode().value),
                'gameSubMenu': to_camel_case(self.game.game_manager.get_game_sub_menu().value),
            }
            return payload
        else:
            self.game.game_manager.set_game_sub_menu(Game_Sub_Menu.CLEAR)
            self.game.game_manager.set_game_mode(Game_Mode.BUY_SELL_JET)

            payload = {
                'gameState': to_camel_case(self.game.game_manager.get_game_mode().value),
                'gameSubMenu': '',
            }
            return payload

    def reset_stooges(self):
        self.stooges = 0

    def remove_stooge(self):
        self.stooges -= 1

    def subtract_health(self, amount):
        self.health -= amount
        return self.health

    def reset_health(self):
        self.health = 100
        return self.health

    def add_health(self, amount):
        self.health += amount
        return self.health

    def set_stooges(self, number):
        setattr(self, 'stooges', number)
        return getattr(self, 'stooges')

    def randomize_stooges(self, day):
        if day < 5:
            self.set_stooges(0)
            return
        if day < 10:
            self.set_stooges(random.randint(1, 3))
            return
        if day < 15:
            self.set_stooges(random.randint(2, 4))
            return
        if day < 20:
            self.set_stooges(random.randint(2, 5))
            return
        if day < 25:
            self.set_stooges(random.randint(3, 6))
        if day < 30:
            self.set_stooges(random.randint(5, 8))

    def calculate_stooge_damage(self):
        total_damage = 0
        for _ in range(self.stooges):
            damage = random.randint(0, 1)
            amount = self.stooges * damage
            total_damage += amount
        return total_damage

    def run(self):
        self.game.game_manager.set_game_sub_menu(Game_Sub_Menu.CHASE_RESULT)
        random_number = random.randint(1, 100)
        if random_number > 50:
            self.set_stooges(0)
            # build system message
            system_message = 'YOU GOT AWAY. EVEN IF THEY GOT YOUR NAME ON IT THEY WONT CATCH YOU NOW.'
        else:
            total_damage = self.calculate_stooge_damage()
            self.subtract_health(total_damage)

            if self.health < 0:
                self.health = 0

            # build system message
            system_message = f'YOU TOOK {total_damage} DAMAGE'

        payload = {
            'chase': {'health': self.health,
                      'stooges': self.stooges},
            'gameSubMenu': to_camel_case(self.game.game_manager.get_game_sub_menu().value),
            'systemMessage': system_message
        }

        return payload

    def bribe(self):
        # bribe_threshold is how hard it is to bribe.. if you roll over this number the bribe suceeds
        bribe_threshold = 10
        bribe_success_count = 0
        bribe_fail_count = 0

        # loop over number of corn dogs to determine how many stooges you shook off
        for _ in range(self.game.player.trench_coat.get_corn_dogs()):
            if (self.stooges > 0):
                dice_roll = random.randint(1, 100)
                if (dice_roll > bribe_threshold):
                    bribe_success_count += 1
                    self.remove_stooge()
                if (dice_roll < bribe_threshold):
                    bribe_fail_count += 1

        # calculate damage
        total_damage = self.calculate_stooge_damage()
        self.subtract_health(total_damage)

        if self.health < 0:
            self.health = 0

        # set game sub menu
        self.game.game_manager.set_game_sub_menu(Game_Sub_Menu.CHASE_RESULT)

        # build system message and offer heal if you got em all
        if self.stooges == 0:
            self.game.game_manager.set_game_sub_menu(Game_Sub_Menu.HEAL)
            system_message = f'GOT EM. THERE WAS NO EVIDENCE. COST TO FULL HEAL IS 4000.'
        if self.stooges > 0 and bribe_fail_count == 0:
            system_message = f'YOU SUCCESSFULLY BRIBED {bribe_success_count} FLEA MARKET STOOGES. YOU TOOK {total_damage} DAMAGE.'
        if bribe_success_count > 0 and bribe_fail_count > 0 and self.stooges > 0:
            system_message = f'THE CORN DOGS WERE MID SADLY. BRIBE WAS NOT ACCEPTED BY {bribe_fail_count} STOOGES. YOU SUCCESSFULLY BRIBED {bribe_success_count} FLEA MARKET STOOGES. YOU TOOK {total_damage} DAMAGE.'
        if bribe_success_count == 0 and bribe_fail_count > 0 and self.stooges > 0:
            system_message = f'THE CORN DOGS WERE MID SADLY. BRIBE WAS NOT ACCEPTED. YOU TOOK {total_damage} DAMAGE.'

        payload = {
            'chase': {'health': self.health,
                      'stooges': self.stooges},
            'gameSubMenu': to_camel_case(self.game.game_manager.get_game_sub_menu().value),
            'systemMessage': system_message,
        }
        return payload

    def run_or_bribe(self, key):
        if key == 'r' or key == 'B':
            return self.run()
        else:
            return self.bribe()

    def run_or_bribe_continue(self):
        # check for game over
        if self.health > 0:
            if self.stooges > 0:
                return self.start_chase()

            if self.stooges == 0:
                return self.exit_chase()
        if self.health <= 0:
            return self.game.game_manager.game_over()
