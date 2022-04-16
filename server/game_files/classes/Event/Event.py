
import random

from ...classes.Prices.Prices import Price_Limit
from ...constants import Game_Mode, Game_Sub_Menu, Items, Locations, Utility_Items
from ...utilities.utils import d_100_dice_roll, randomize, to_camel_case


class Event():
    def __init__(self, game):
        self.game = game

    def heal(self):
        current_cash = self.game.player.trench_coat.cash

        # reset health
        # subtract cost
        if (current_cash >= 4000):
            self.game.player.trench_coat.subtract_cash(4000)
            self.game.chase.reset_health()

        return self.game.chase.exit_chase()

    def random_event(self):
        event_functions = [self.game.event.sale_event,
                           self.game.event.surge_event,
                           self.game.event.robbed,
                           self.game.event.found_money,
                           self.game.event.random_message,
                           self.game.event.buy_corn_dog,
                           self.game.event.add_trench_coat_pockets]

        # pick random event
        number_of_events = len(event_functions)
        event_id = random.randint(0, number_of_events - 1)
        function = event_functions[event_id]
        return function()

    def buy_corn_dog(self):
        self.game.game_manager.set_game_sub_menu(Game_Sub_Menu.YES_OR_NO_EVENT)
        current_corn_dogs = self.game.player.trench_coat.get_corn_dogs()
        corn_dog_price = current_corn_dogs * 2000 if current_corn_dogs > 0 else 2000
        current_cash = self.game.player.trench_coat.get_amount('cash')

        # if player can afford corn dog, set corn dog as current item
        # set staged amount
        if current_cash >= corn_dog_price:
            self.game.game_manager.set_current_item(Utility_Items.CORN_DOGS)
            self.game.game_manager.set_staged_amount(1)
            self.game.game_manager.set_staged_price(corn_dog_price)

        # if player cannot afford, set amount and price to 0
        if current_cash < corn_dog_price:
            self.game.game_manager.set_current_item(Utility_Items.CORN_DOGS)
            self.game.game_manager.set_staged_amount(0)
            self.game.game_manager.set_staged_price(0)

        if current_corn_dogs == 0:
            system_message = 'WOULD YOU LIKE TO BUY A CORN DOG FOR $2000?'

        if current_corn_dogs > 0:
            corn_dog_price = current_corn_dogs * 2000
            system_message = f'WOULD YOU LIKE TO BUY A CORN DOG FOR {corn_dog_price}?'

        return system_message

    def add_trench_coat_pockets(self):
        self.game.game_manager.set_game_sub_menu(Game_Sub_Menu.YES_OR_NO_EVENT)
        current_cash = self.game.player.trench_coat.get_amount('cash')
        current_day = self.game.game_manager.day

        # determine increase amount and price to increase

        if current_day < 10:
            increase_amount = random.randint(10, 20)
            price_to_increase = increase_amount * 200

        if current_day >= 10 and current_day < 20:
            increase_amount = random.randint(20, 35)
            price_to_increase = increase_amount * 400

        if current_day >= 20:
            increase_amount = random.randint(30, 50)
            price_to_increase = increase_amount * 800

        # if player can afford, set max hold as current item
        # set staged amount
        if current_cash >= price_to_increase:
            self.game.game_manager.set_current_item(Utility_Items.MAX_HOLD)
            self.game.game_manager.set_staged_amount(increase_amount)
            self.game.game_manager.set_staged_price(price_to_increase)

        # if player cannot afford, set amount and price to 0
        if current_cash < price_to_increase:
            self.game.game_manager.set_current_item(Utility_Items.MAX_HOLD)
            self.game.game_manager.set_staged_amount(0)
            self.game.game_manager.set_staged_price(0)

        system_message = f'WOULD YOU LIKE TO ADD {increase_amount} POCKETS TO YOUR TRENCH COAT FOR ${price_to_increase}??'
        return system_message

    def sale_event(self):
        prices = self.game.prices

        dice_roll = d_100_dice_roll()
        if dice_roll < 80:
            sale_item = random.randint(1, 4)
        if dice_roll > 80:
            sale_item = random.randint(5, 6)

        if sale_item == 1:
            prices.dvds = randomize(
                int(Price_Limit.DVDS_LOW/4), int(Price_Limit.DVDS_HIGH/4))
            item = 'DVDS'
        if sale_item == 2:
            prices.hot_sauce = randomize(
                int(Price_Limit.HOT_SAUCE_LOW/4), int(Price_Limit.HOT_SAUCE_HIGH/4))
            item = 'HOT SAUCE'
        if sale_item == 3:
            prices.switchblades = self.switchblades = randomize(
                int(Price_Limit.SWITCHBLADES_LOW/4), int(Price_Limit.SWITCHBLADES_HIGH/4))
            item = 'SWITCHBLADES'
        if sale_item == 4:
            prices.fake_shoes = randomize(
                int(Price_Limit.FAKE_SHOES_LOW/4), int(Price_Limit.FAKE_SHOES_HIGH/4))
            item = 'FAKE SHOES'
        if sale_item == 5:
            prices.cell_phones = randomize(
                int(Price_Limit.CELL_PHONES_LOW/2), int(Price_Limit.CELL_PHONES_HIGH/2))
            item = 'CELL PHONES'
        if sale_item == 6:
            prices.massage_chairs = randomize(
                int(Price_Limit.GOLF_CARTS_LOW/2), int(Price_Limit.GOLF_CARTS_HIGH/2))
            item = 'MASSAGE CHAIRS'
        system_message = f'A TATTED UP 13 YEAR OLD IS SELLING CHEAP {item} OUT OF HIS VAN.. DONT ASK QUESTIONS!!'
        return system_message

    def surge_event(self):
        prices = self.game.prices

        dice_roll = d_100_dice_roll()
        if dice_roll < 80:
            surge_item = random.randint(1, 4)
        if dice_roll > 80:
            surge_item = random.randint(5, 6)

        if surge_item == 1:
            prices.dvds = randomize(
                int(Price_Limit.DVDS_LOW*4), int(Price_Limit.DVDS_HIGH*4))
            item = 'DVDS'
        if surge_item == 2:
            prices.hot_sauce = randomize(
                int(Price_Limit.HOT_SAUCE_LOW*4), int(Price_Limit.HOT_SAUCE_HIGH*4))
            item = 'HOT SAUCE'
        if surge_item == 3:
            prices.switchblades = self.switchblades = randomize(
                int(Price_Limit.SWITCHBLADES_LOW*4), int(Price_Limit.SWITCHBLADES_HIGH*4))
            item = 'SWITCHBLADES'
        if surge_item == 4:
            prices.fake_shoes = randomize(
                int(Price_Limit.FAKE_SHOES_LOW*4), int(Price_Limit.FAKE_SHOES_HIGH*4))
            item = 'FAKE SHOES'
        if surge_item == 5:
            prices.cell_phones = randomize(
                int(Price_Limit.CELL_PHONES_LOW*2), int(Price_Limit.CELL_PHONES_HIGH*2))
            item = 'CELL PHONES'
        if surge_item == 6:
            prices.massage_chairs = randomize(
                int(Price_Limit.GOLF_CARTS_LOW*2), int(Price_Limit.GOLF_CARTS_HIGH*2))
            item = 'MASSAGE CHAIRS'
        system_message = f'LOCALS ARE BUYING {item} AT OUTRAGEOUS PRICES HERE!!'
        return system_message

    def robbed(self):
        dice_roll = d_100_dice_roll()

        cash = self.game.player.trench_coat.get_amount('cash')
        if cash > 0 and dice_roll < 80:
            amount_to_rob = int((cash * .10)/10 * 10)
            self.game.player.trench_coat.subtract_cash(amount_to_rob)
            system_message = f'YOUR CAR BROKE DOWN AND IT COST ${amount_to_rob} TO FIX!!'

        if cash > 0 and dice_roll > 80:
            amount_to_rob = int((cash * .25)/10 * 10)
            self.game.player.trench_coat.subtract_cash(amount_to_rob)
            system_message = f'GIMMIE THAT CASH. LOST ${amount_to_rob}!!'

        if cash <= 0:
            system_message = 'YOU GOT NO MONEY HUH'

        return system_message

    def found_money(self):
        dice_roll = d_100_dice_roll()
        cash = self.game.player.trench_coat.get_amount('cash')
        amount_to_find = int((cash * .10)/10 * 10)

        if dice_roll < 80:
            amount_to_find = int((cash * .10)/10 * 10)
            self.game.player.trench_coat.add_cash(amount_to_find)
            system_message = f'FOUND ${amount_to_find} JUST LAYING ON THE GROUND!!'

        if dice_roll > 80:
            amount_to_find = int((cash * .25)/10 * 10)
            self.game.player.trench_coat.add_cash(amount_to_find)
            system_message = f'YOU FOUND A SUITCASE FULL OF CASH!! ${amount_to_find} ADDED TO TRENCH COAT.'

        if cash <= 0:
            system_message = 'YOU GOT NO MONEY HUH'

        return system_message

    def random_message(self):
        system_message = 'WHY DOES IT FEEL LIKE EVERYONE IS STARING AT YOU..'

        return system_message

    def yes_or_no_continue(self, key):

        # at this point we can trust that we can afford the current amount and staged price
        if key == 'y' or key == 'Y':
            current_item = self.game.game_manager.get_current_item().value
            staged_amount = self.game.game_manager.get_staged_amount()
            staged_price = self.game.game_manager.get_staged_price()

            self.game.player.trench_coat.add_inventory(
                current_item, staged_amount)
            self.game.player.trench_coat.subtract_cash(staged_price)

        self.game.game_manager.reset_current_item()
        self.game.game_manager.reset_staged_amount()
        self.game.game_manager.reset_staged_price()

        return self.event_continue()

    def event_continue(self):

        # if location is florida show inventory prompts
        if self.game.location.get_location().value == Locations.FLORIDA.value:
            self.game.game_manager.set_game_sub_menu(
                Game_Sub_Menu.PROMPT_FOR_SHARK)
            self.game.game_manager.set_game_mode(
                Game_Mode.MANAGE_INVENTORY)

            payload = {
                'gameState': to_camel_case(self.game.game_manager.get_game_mode().value),
                'gameSubMenu': to_camel_case(self.game.game_manager.get_game_sub_menu().value),
                'trenchCoat': self.game.player.trench_coat.get_trench_coat()
            }
            return payload
        else:
            self.game.game_manager.set_game_sub_menu('')
            self.game.game_manager.set_game_mode(Game_Mode.BUY_SELL_JET)

            payload = {
                'gameState': to_camel_case(self.game.game_manager.get_game_mode().value),
                'gameSubMenu': '',
                'trenchCoat': self.game.player.trench_coat.get_trench_coat()
            }
            return payload
