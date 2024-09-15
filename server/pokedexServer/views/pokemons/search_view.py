import pokebase as pb
from drf_spectacular.utils import extend_schema
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from django.core.cache import cache
from pokedexServer.models.pokemon.Colors import Colors
from pokedexServer.models.pokemon.PokemonTypeModel import PokemonTypeModel
from pokedexServer.utils import pad

class PokemonSearchView(GenericAPIView):

    @extend_schema(operation_id="pokemon_search", summary="Search Pokémon by name")
    def get(self, request):
        query = request.GET.get('search', '').lower()
        poke_api_pokemons = pb.APIResourceList('pokemon')

        if query:
            # Filter Pokémon by the query
            filtered_pokemons = filter(lambda pokemon: query in pokemon['name'].lower(), poke_api_pokemons)
        else:
            # If no query, return all
            filtered_pokemons = poke_api_pokemons

        # Map the filtered Pokémon data to return the required information
        results = list(map(self.extract_pokemon_details, filtered_pokemons))

        return Response({
            "count": len(results),
            "results": results
        }, status=status.HTTP_200_OK)

    @staticmethod
    def extract_pokemon_details(pokemon_data):
        # Extract the Pokémon name and number (last part of the URL)
        url = pokemon_data['url']
        number = url.rstrip('/').split('/')[-1]

        # Generate cache key based on the Pokémon number
        cache_key = f'pokemon_{number}'
        pokemon_details = cache.get(cache_key)

        if not pokemon_details:
            # If not in cache, fetch from the API
            pokemon = pb.pokemon(int(number))  # Fetch detailed Pokémon data

            # Get the first type to determine background color
            first_type = pokemon.types[0].type.name if pokemon.types else "normal"
            background_color = Colors[PokemonTypeModel(first_type).value].value[0]

            # Prepare the details to be cached
            pokemon_details = {
                "name": pokemon_data['name'],
                "number": pad(int(number)),
                "id": number,
                "background_color": background_color,
                "image": f'https://github.com/eidan66/pokemon-api-sprites/blob/master/sprites/pokemon/other/showdown/{number}.gif?raw=true',
            }

            # Cache the Pokémon details for 24 hours (86400 seconds)
            cache.set(cache_key, pokemon_details, timeout=86400)

        return pokemon_details