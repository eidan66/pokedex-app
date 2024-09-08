from enum import Enum

class CaseInsensitiveEnum(str, Enum):
    @classmethod
    def _missing_(cls, value):
        value = value.lower()
        for member in cls:
            if member.lower() == value:
                return member
        return cls('Unknown')


class PokemonTypeModel(CaseInsensitiveEnum):
 Bug = 'Bug',
 Dark = 'Dark',
 Dragon = 'Dragon',
 Electric = 'Electric',
 Fairy = 'Fairy',
 Fighting = 'Fighting',
 Fire = 'Fire',
 Flying = 'Flying',
 Ghost = 'Ghost',
 Grass = 'Grass',
 Ground = 'Ground',
 Ice = 'Ice',
 Normal = 'Normal',
 Poison = 'Poison',
 Psychic = 'Psychic',
 Rock = 'Rock',
 Steel = 'Steel',
 Water = 'Water'

 Unknown = 'Unknown'