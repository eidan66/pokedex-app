from django.http import JsonResponse

from .models.response.APIPageResponse import APIPageResponse
from .models.pokemon.Colors import Colors
from .models.pokemon.PokemonModel import PokemonModel
from .models.pokemon.PokemonTypeModel import PokemonTypeModel
from .utils import pad, paginate

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
    offset = int(request.GET.get('offset', 0))
    limit = int(request.GET.get('limit', 20))
    
    if (limit > 20):
        limit = 20
    
    pokeAPIPokemons = pb.APIResourceList('pokemon')
    count = pokeAPIPokemons.count
    full_url = request.build_absolute_uri()[:-1]
    
    
    # if offset is 0 -> previous is  None
    # if offset - limit >= 0 -> previous_offset = offset - limit; previous_limit = limit
    # if offset - limit < 0 -> previous_limit = offset ; previous_offset = 0; 
    previous = None
    if (offset > 0):
        
        if (offset - limit < 0):
            previous_offset = 0
            previous_limit = offset
        else:
            previous_offset = offset - limit
            previous_limit = limit
        previous = f'{full_url}?offset={previous_offset}&limit={previous_limit}'
    
    # if offset + limit >= count -> next is  None
    # if offset + limit < count -> next_offset = offset + limit; 
    # if next_offset + limit < count next_limit = limit
    # else next_limit = count - next_offset
     
    next = None
    
    if (offset + limit < count):
        next_offset = offset + limit
        if (next_offset + limit < count):
            next_limit = limit
        else:
            next_limit = count - next_offset
        next = f'{full_url}?offset={next_offset}&limit={next_limit}'
    pokeAPIPokemonsNamesPage = paginate(list(pokeAPIPokemons.names), offset, limit)
    results = list(map(lambda name: fetchAndMapPokemon(name).__dict__, pokeAPIPokemonsNamesPage))
    responseData = APIPageResponse(pokeAPIPokemons.count, next, previous, results)
    return JsonResponse(responseData.__dict__)


def fetchAndMapPokemon(name):
    pokeAPIPokemon = pb.pokemon(name)
    pokemonModel = mapPokeAPIPokemonToPokemonModel(pokeAPIPokemon)
    return pokemonModel
def getPokemon(request, name):
    pokemonModel = fetchAndMapPokemon(name)
    return JsonResponse(pokemonModel.__dict__)