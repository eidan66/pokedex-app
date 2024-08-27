from django.http import JsonResponse

from .models.pokemon.Colors import Colors
from .models.pokemon.PokemonModel import PokemonModel
from .models.pokemon.PokemonTypeModel import PokemonTypeModel
from .utils import pad

import pokebase as pb


def mapToPokemonTypeModel(pokeAPIPokemonType):
    return PokemonTypeModel(pokeAPIPokemonType.type.name)

def mapPokeAPIPokemonToPokemonModel(pokeAPIPokemon):
    pokemonModel = PokemonModel(pokeAPIPokemon.id,
                                pokeAPIPokemon.name,
                                pad(pokeAPIPokemon.id),
                                list(map(mapToPokemonTypeModel, pokeAPIPokemon.types)),
                                Colors[PokemonTypeModel(pokeAPIPokemon.types[0].type.name).value].value[0],
                                f'https://github.com/eidan66/pokemon-api-sprites/blob/master/sprites/pokemon/other/showdown/{str(id)}.gif?raw=true')
    return pokemonModel

def getPokemonsPage(request):
    offset = request.GET.get('offset', 0)
    limit = request.GET.get('limit', 20)
    
    pokeAPIPokemons = pb.APIResourceList('pokemon')
    
    
    return JsonResponse({'name': 'pikachu', 'o': offset, 'l': limit, 'num': pad(111), 'pokemons': pb.APIResourceList('pokemon').__dict__})



def getPokemon(request, name):
    pokeAPIPokemon = pb.pokemon(name)
    pokemonModel = mapPokeAPIPokemonToPokemonModel(pokeAPIPokemon)
    return JsonResponse(pokemonModel.__dict__)