import random


class Prices():
    def __init__(self):
        self.fake_shoes = 0
        self.dvds = 0
        self.hot_sauce = 0
        self.pocket_knives = 0
        self.cell_phones = 0
        self.golf_carts = 0

    def set_prices(self):
        #10 - 60
        self.dvds = self.randomize(10, 60)
        #70 -250
        self.hot_sauce = self.randomize(70, 250)
        #300 - 900
        self.pocket_knives = self.randomize(300, 900)
        #1000 - 4500
        self.fake_shoes = self.randomize(1000, 4500)
        #5000 - 14000
        self.cell_phones = self.randomize(5000, 14000)
        #15000 - 30000
        self.golf_carts = self.randomize(15000, 30000)

    def get_item_price(self, item):
        if hasattr(self, item):
            return getattr(self, item)

    def get_prices(self):
        return self.__dict__

    def randomize(self, lower_bound, upper_bound):
        return random.randint(lower_bound, upper_bound)

    def determine_sale(self):
        sale_decider = random.randint(1, 5)
        # 1/5 chance that something will go on sale
        if sale_decider == 1:
            sale_item = random.randint(1, 6)
            if sale_item == 1:
                self.dvds = random.randint(1, 6)
            if sale_item == 2:
                self.hot_sauce = random.randint(7, 25)
            if sale_item == 3:
                self.pocket_knives = random.randint(30, 90)
            if sale_item == 4:
                self.fake_shoes = random.randint(100, 450)
            if sale_item == 5:
                self.cell_phones = random.randint(500, 1400)
            if sale_item == 6:
                self.golf_carts = random.randint(1500, 3000)
