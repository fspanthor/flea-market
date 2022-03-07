class Stash():
    def __init__(self):
        self.nachos = 0
        self.dvds = 0
        self.hot_sauce = 0
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

    def stash(self, money, amount_change):
        self.money = money + amount_change
        return self.money
