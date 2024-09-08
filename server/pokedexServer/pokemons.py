# pokemons.py
import pokebase as pb

from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import PokemonSerializer 
from .models.pokemon.PokemonModel import PokemonModel
from .models.pokemon.PokemonTypeModel import PokemonTypeModel
from .models.pokemon.Colors import Colors
from .utils import pad, paginate



class PokemonListView(GenericAPIView):
    serializer_class = PokemonSerializer  # Specify the serializer class

    @extend_schema(operation_id="pokemon_list", summary="List all Pokémon")
    def get(self, request):
        offset = int(request.GET.get('offset', 0))
        limit = int(request.GET.get('limit', 20))

        if limit > 20:
            limit = 20

        pokeAPIPokemons = pb.APIResourceList('pokemon')
        count = pokeAPIPokemons.count
        full_url = request.build_absolute_uri()[:-1]

        previous, next = self.get_pagination_links(request, offset, limit, count, full_url)
        pokeAPIPokemonsNamesPage = paginate(list(pokeAPIPokemons.names), offset, limit)
        results = list(map(lambda name: self.fetchAndMapPokemon(name).__dict__, pokeAPIPokemonsNamesPage))

        return Response({
            "count": count,
            "next": next,
            "previous": previous,
            "results": results
        }, status=status.HTTP_200_OK)

    def fetchAndMapPokemon(self, name):
        pokeAPIPokemon = pb.pokemon(name)
        return PokemonModel(
            pokeAPIPokemon.id,
            pokeAPIPokemon.name,
            pad(pokeAPIPokemon.id),
            list(map(self.mapToPokemonTypeModel, pokeAPIPokemon.types)),
            Colors[PokemonTypeModel(pokeAPIPokemon.types[0].type.name).value].value[0],
            f'https://github.com/eidan66/pokemon-api-sprites/blob/master/sprites/pokemon/other/showdown/{pokeAPIPokemon.id}.gif?raw=true'
        )

    def mapToPokemonTypeModel(self, pokeAPIPokemonType):
        return PokemonTypeModel(pokeAPIPokemonType.type.name)

    def get_pagination_links(self, request, offset, limit, count, full_url):
        previous, next = None, None

        if offset > 0:
            previous_offset = max(0, offset - limit)
            previous_limit = min(limit, offset)
            previous = f'{full_url}?offset={previous_offset}&limit={previous_limit}'

        if offset + limit < count:
            next_offset = offset + limit
            next_limit = min(limit, count - next_offset)
            next = f'{full_url}?offset={next_offset}&limit={next_limit}'

        return previous, next

class PokemonDetailView(APIView):
    serializer_class = PokemonSerializer

    @extend_schema(operation_id="pokemon_detail", summary="Retrieve a Pokémon by ID")
    def get(self, request, id):
        pokemonModel = self.fetchAndMapPokemon(id)
        if pokemonModel.error:  # Now correctly checking for an error
            return Response({"error": pokemonModel.error}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(pokemonModel)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def fetchAndMapPokemon(self, id):
        try:
            pokeAPIPokemon = pb.pokemon(id)
            if not pokeAPIPokemon:
                return PokemonModel(error="Pokemon not found")
            # Proper mapping of the pokeAPIPokemon data to PokemonModel
            return PokemonModel(
                id=pokeAPIPokemon.id,
                name=pokeAPIPokemon.name,
                number=pad(pokeAPIPokemon.id),
                types=[type.type.name for type in pokeAPIPokemon.types],
                boxBg=Colors[PokemonTypeModel(pokeAPIPokemon.types[0].type.name).value].value[0],
                svg=f'https://github.com/eidan66/pokemon-api-sprites/blob/master/sprites/pokemon/other/showdown/{pokeAPIPokemon.id}.gif?raw=true'
            )
        except Exception as e:
            return PokemonModel(error=str(e))

    def mapToPokemonTypeModel(self, pokeAPIPokemonType):
        return PokemonTypeModel(pokeAPIPokemonType.type.name)