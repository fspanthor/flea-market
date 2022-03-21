from .TrenchCoat.TrenchCoat import TrenchCoat
from .Location.Location import Location
from .Instructions.Instructions import Instructions
from .Prices.Prices import Prices
from .Player.Player import Player
from .GameManager.GameManager import GameManager
from .Shark.Shark import Shark


class Game():
    def __init__(self):
        self.player = Player(self)
        self.location = Location(self)
        self.prices = Prices()
        self.game_manager = GameManager(self)
        self.instructions = Instructions(self)
        self.shark = Shark(self)
