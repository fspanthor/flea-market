from ...utilities.utils import dict_keys_to_camel_case


class Stash():
    def __init__(self):
        self.fake_shoes = 0
        self.dvds = 0
        self.hot_sauce = 0
        self.switchblades = 0
        self.cell_phones = 0
        self.massage_chairs = 0
        self.bank = 0
        self.debt = 5500

    def reset_stash(self):
        self.fake_shoes = 0
        self.dvds = 0
        self.hot_sauce = 0
        self.switchblades = 0
        self.cell_phones = 0
        self.massage_chairs = 0
        self.bank = 0
        self.debt = 5500

    def get_stash(self):
        return dict_keys_to_camel_case(self.__dict__)
