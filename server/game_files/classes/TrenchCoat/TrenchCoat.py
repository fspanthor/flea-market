from ...utilities.utils import dict_keys_to_camel_case


class TrenchCoat():
    def __init__(self):
        self.fake_shoes = 0
        self.dvds = 0
        self.hot_sauce = 0
        self.switchblades = 0
        self.cell_phones = 0
        self.massage_chairs = 0
        self.corn_dogs = 1
        self.cash = 0
        self.max_hold = 100

    def reset_trench_coat(self):
        self.fake_shoes = 0
        self.dvds = 0
        self.hot_sauce = 0
        self.switchblades = 0
        self.cell_phones = 0
        self.massage_chairs = 0
        self.corn_dogs = 1
        self.cash = 2000
        self.max_hold = 100

    def get_amount(self, item):
        if hasattr(self, item):
            return getattr(self, item)

    def get_corn_dogs(self):
        return self.get_amount('corn_dogs')

    def add_inventory(self, item, amount):
        if hasattr(self, item):
            new_amount = getattr(self, item) + amount
            setattr(self, item, new_amount)

    def subtract_inventory(self, item, amount):
        if hasattr(self, item):
            new_amount = getattr(self, item) - amount
            setattr(self, item, new_amount)

    def add_cash(self, amount_change):
        self.cash += amount_change

    def subtract_cash(self, amount_change):
        self.cash -= amount_change

    def get_trench_coat(self):
        return dict_keys_to_camel_case(self.__dict__)
