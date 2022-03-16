class TrenchCoat():
    def __init__(self):
        self.fake_shoes = 0
        self.dvds = 0
        self.hot_sauce = 0
        self.switchblades = 0
        self.cell_phones = 0
        self.golf_carts = 0
        self.corn_dogs = 0
        self.cash = 0
        self.max_hold = 100

    def get_amount(self, item):
        if hasattr(self, item):
            return getattr(self, item)

    def add_inventory(self, item, amount):
        if hasattr(self, item):
            new_amount = getattr(self, item) + amount
            setattr(self, item, new_amount)

    def change_wallet(self, cash, amount_change):
        self.cash = cash + amount_change
        return getattr(self, cash)

    def get_trench_coat(self):
        return self.__dict__
