class Prices():
    def __init__(self):
        self.nachos = 0
        self.dvds = 0
        self.hot_sauce = 0
        self.pocket_knives = 0
        self.cell_phones = 0
        self.golf_carts = 0

    def set_prices(self):
        #10 - 60
        self.nachos = 10
        #70 -250
        self.dvds = 70
        #300 - 900
        self.hot_sauce = 300
        #1000 - 4500
        self.pocket_knives = 1000
        #5000 - 14000
        self.cell_phones = 5000
        #15000 - 30000
        self.golf_carts = 15000

    def get_item_price(self, item):
        if hasattr(self, item):
            return getattr(self, item)

    def get_prices(self):
        return self.__dict__
