from ...constants import Locations


class Location():
    def __init__(self):
        self.location = Locations.FLORIDA

    def set_location(self, location):
        if hasattr(self, location):
            setattr(self, location)
            return getattr(self, location)

    def get_location(self):
        return self.__dict__
