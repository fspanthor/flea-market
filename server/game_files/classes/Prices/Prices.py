from enum import IntEnum

from ...utilities.utils import dict_keys_to_camel_case, randomize


class Price_Limit(IntEnum):
    DVDS_LOW = 10
    DVDS_HIGH = 60
    HOT_SAUCE_LOW = 70
    HOT_SAUCE_HIGH = 250
    SWITCHBLADES_LOW = 300
    SWITCHBLADES_HIGH = 900
    FAKE_SHOES_LOW = 1000
    FAKE_SHOES_HIGH = 4500
    CELL_PHONES_LOW = 5000
    CELL_PHONES_HIGH = 14000
    GOLF_CARTS_LOW = 15000
    GOLF_CARTS_HIGH = 30000


class Prices():
    def __init__(self):
        self.fake_shoes = randomize(
            Price_Limit.FAKE_SHOES_LOW, Price_Limit.FAKE_SHOES_HIGH)
        self.dvds = randomize(
            Price_Limit.DVDS_LOW, Price_Limit.DVDS_HIGH)
        self.hot_sauce = randomize(
            Price_Limit.HOT_SAUCE_LOW, Price_Limit.HOT_SAUCE_HIGH)
        self.switchblades = randomize(
            Price_Limit.SWITCHBLADES_LOW, Price_Limit.SWITCHBLADES_HIGH)
        self.cell_phones = randomize(
            Price_Limit.CELL_PHONES_LOW, Price_Limit.CELL_PHONES_HIGH)
        self.massage_chairs = randomize(
            Price_Limit.GOLF_CARTS_LOW, Price_Limit.GOLF_CARTS_HIGH)

    def set_prices(self):
        #10 - 60
        self.dvds = randomize(
            Price_Limit.DVDS_LOW, Price_Limit.DVDS_HIGH)
        #70 -250
        self.hot_sauce = randomize(
            Price_Limit.HOT_SAUCE_LOW, Price_Limit.HOT_SAUCE_HIGH)
        #300 - 900
        self.switchblades = randomize(
            Price_Limit.SWITCHBLADES_LOW, Price_Limit.SWITCHBLADES_HIGH)
        #1000 - 4500
        self.fake_shoes = randomize(
            Price_Limit.FAKE_SHOES_LOW, Price_Limit.FAKE_SHOES_HIGH)
        #5000 - 14000
        self.cell_phones = randomize(
            Price_Limit.CELL_PHONES_LOW, Price_Limit.CELL_PHONES_HIGH)
        #15000 - 30000
        self.massage_chairs = randomize(
            Price_Limit.GOLF_CARTS_LOW, Price_Limit.GOLF_CARTS_HIGH)

    def get_item_price(self, item):
        if hasattr(self, item):
            return getattr(self, item)

    def get_prices(self):
        return dict_keys_to_camel_case(self.__dict__)
