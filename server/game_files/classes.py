
class Game:
    def __init__(self):
        self.player = Player()
        self.prices = Prices()


class Player:
    def __init__(self):
        self.inventory = Inventory()


class Inventory:
    def __init__(self):
        self.nachos = 3
        self.dvds = 0
        self.hotSauce = 0
        self.pocket_knives = 0
        self.cell_phones = 0
        self.golf_carts = 0
        self.money = 0

    def get_amount(self, item):
        if hasattr(self, item):
            return getattr(self, item)

    def add_inventory(self, item, amount):
        if hasattr(self, item):
            new_amount = getattr(self, item) + amount
            setattr(self, item, new_amount)

    def changeWallet(self, money, amount_change):
        new_amount = money + amount_change
        setattr(self, money, new_amount)


class Prices:
    def __init__(self):
        self.nachos = 0
        self.dvds = 0
        self.hotSauce = 0
        self.pocket_knives = 0
        self.cell_phones = 0
        self.golf_carts = 0

    def set_prices(self):
        #10 - 60
        self.nachos = 10
        #70 -250
        self.dvds = 70
        #300 - 900
        self.hotSauce = 300
        #1000 - 4500
        self.pocket_knives = 1000
        #5000 - 14000
        self.cell_phones = 5000
        #15000 - 30000
        self.golf_carts = 15000

    def get_prices(self):
        return self.__dict__