import pokebase as pb

from drf_spectacular.utils import extend_schema
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status

from pokedexServer.models.pokemon.Colors import Colors
from pokedexServer.models.pokemon.PokemonModel import PokemonModel
from pokedexServer.models.pokemon.PokemonTypeModel import PokemonTypeModel
from pokedexServer.serializers.pokemon_list_serializers import PokemonListSerializer
from pokedexServer.utils import paginate, pad


class PokemonListView(GenericAPIView):
    serializer_class = PokemonListSerializer  # Specify the serializer class

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

        base_url = full_url.split('?')[0]

        if offset > 0:
            previous_offset = max(0, offset - limit)
            previous = f'{base_url}?offset={previous_offset}&limit={limit}'

        if offset + limit < count:
            next_offset = offset + limit
            next = f'{base_url}?offset={next_offset}&limit={limit}'

        return previous, next
