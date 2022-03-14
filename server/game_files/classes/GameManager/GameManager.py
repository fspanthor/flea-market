from ...constants import Game_Mode, Locations


class GameManager():
    def __init__(self, game):
        self.day = 0
        self.game_mode = Game_Mode.INIT
        self.game = game

    def get_day(self):
        return getattr(self, 'day')

    def buy_sell_jet(self, key):
        if key == 'b':
            self.set_game_mode(Game_Mode.BUY)
            return self.get_game_mode().value
        if key == 's':
            self.set_game_mode(Game_Mode.SELL)
            return self.get_game_mode().value
        if key == 'j':
            self.set_game_mode(Game_Mode.JET)
            return self.get_game_mode().value
        else:
            return self.get_game_mode().value

    def jet(self, key):
        if key == '1':
            self.game.location.set_location(Locations.FLORIDA)
            return self.game.location.get_location().value
        if key == '2':
            self.game.location.set_location(Locations.ASHBY_BART)
            return self.game.location.get_location().value
        if key == '3':
            self.game.location.set_location(
                Locations.SAN_JOSE_SUPER_MALL)
            return self.game.location.get_location().value
        if key == '4':
            self.game.location.set_location(Locations.SOLANO_SWAP_MEET)
            return self.game.location.get_location().value
        if key == '5':
            self.game.location.set_location(
                Locations.COMMUNITY_COLLEGE_FLEA_MARKET)
            return self.game.location.get_location().value
        if key == '6':
            self.game.location.set_location(Locations.HAUNTED_MALL)
            return self.game.location.get_location().value
        else:
            return self.game.location.get_location().value

    def get_game_mode(self):
        return getattr(self, 'game_mode')

    def set_game_mode(self, new_mode):
        setattr(self, 'game_mode', new_mode)

    def get_game_state(self):
        if self.day == 30:
            return 'game over'
        if self.game.location.get_location() == Locations.BRONX:
            self.game_mode = Game_Mode.SHARK_BANK_STASH
            return 'prompt for shark, ask for bank, ask for stash'
        if self.game_mode == Game_Mode.SHARK_BANK_STASH:
            return 'prompt for shark bank stash'
        if self.game_mode == Game_Mode.BUY_SELL_JET:
            return 'prompt for buy sell jet'
        if self.game_mode == Game_Mode.BUY:
            return 'prompt for what will you buy'
        if self.game_mode == Game_Mode.BUY_HOW_MUCH:
            return 'prompt for buy how much'
        if self.game_mode == Game_Mode.SELL:
            return 'prompt for what will you buy'
        if self.game_mode == Game_Mode.SELL_HOW_MUCH:
            return 'prompt for buy how much'
        if self.game_mode == Game_Mode.JET:
            return 'prompt for where to jet'
        else:
            return 'test'
