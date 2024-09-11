class PokemonModel:
    def __init__(self, id=None, name=None, number=None, types=None, boxBg=None, gif=None, error=None):
        self.id = id
        self.name = name
        self.number = number
        self.types = types
        self.boxBg = boxBg
        self.gif = gif
        self.error = error

    @property
    def padded_id(self):
        return f"#{self.id:03d}"

    @property
    def sprite_url(self):
        return f'https://github.com/eidan66/pokemon-api-sprites/blob/master/sprites/pokemon/other/showdown/{self.id}.gif?raw=true'

    @property
    def color(self):
        return self.boxBg