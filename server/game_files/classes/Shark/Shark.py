class Shark ():
    def __init__(self):
        self.debt = 5500

    def pay_back_shark(self, amount):
        self.debt -= amount
        return self.debt

    def borrow_from_shark(self, amount):
        self.debt += amount
        return self.debt

    def get_shark(self):
        return self.__dict__
