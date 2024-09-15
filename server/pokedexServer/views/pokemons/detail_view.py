import pokebase as pb

from drf_spectacular.utils import extend_schema
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.core.cache import cache
import logging

logger = logging.getLogger(__name__)

from pokedexServer.models.pokemon.Colors import Colors
from pokedexServer.models.pokemon.PokemonModel import PokemonModel
from pokedexServer.models.pokemon.PokemonTypeModel import PokemonTypeModel
from pokedexServer.serializers.pokemon_detail_serializers import PokemonDetailSerializer
from pokedexServer.utils import pad


class PokemonDetailView(APIView):
    serializer_class = PokemonDetailSerializer

    @extend_schema(operation_id="pokemon_detail", summary="Retrieve a Pokémon by ID")
    def get(self, request, id):
        cache_key = f'pokemon_detail_{id}'
        cached_pokemon = cache.get(cache_key)

        if cached_pokemon:
            return Response(cached_pokemon, status=status.HTTP_200_OK)
        pokemonModel = self.fetchAndMapPokemon(id)
        if pokemonModel.error:  # Now correctly checking for an error
            return Response({"error": pokemonModel.error}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(pokemonModel)
        cache.set(cache_key, serializer.data, timeout=86400)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def fetchAndMapPokemon(self, id):
        try:
            pokeAPIPokemon = pb.pokemon(id)
            if not pokeAPIPokemon:
                return PokemonModel(error="Pokemon not found")
            return PokemonModel(
                id=pokeAPIPokemon.id,
                name=pokeAPIPokemon.name,
                number=pad(pokeAPIPokemon.id),
                types=[type.type.name for type in pokeAPIPokemon.types],
                boxBg=Colors[PokemonTypeModel(pokeAPIPokemon.types[0].type.name).value].value[0],
                gif=f'https://github.com/eidan66/pokemon-api-sprites/blob/master/sprites/pokemon/other/showdown/{pokeAPIPokemon.id}.gif?raw=true'
            )
        except Exception as e:
            logger.error(f"Error fetching Pokemon: {e}")
            return PokemonModel(error="Error fetching Pokemon")

    def mapToPokemonTypeModel(self, pokeAPIPokemonType):
        return PokemonTypeModel(pokeAPIPokemonType.type.name)
