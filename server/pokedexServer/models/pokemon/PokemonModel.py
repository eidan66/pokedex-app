class PokemonModel:
    def __init__(self, id=None, name=None, number=None, types=None, boxBg=None, svg=None, error=None):
        self.id = id
        self.name = name
        self.number = number
        self.types = types
        self.boxBg = boxBg
        self.svg = svg
        self.error = error