import pokebase as pb

from drf_spectacular.utils import extend_schema
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from pokedexServer.serializers.pokemon_info_serializers import PokemonInfoSerializer
from pokedexServer.utils import  pad
class PokemonInfoView(APIView):
    serializer_class = PokemonInfoSerializer

    @extend_schema(
        operation_id="pokemon_info",
        summary="Get Pokémon details by ID",
        responses=PokemonInfoSerializer

    )
    def get(self, request, id):
        try:
            # Fetching Pokémon data using pokebase
            pokemon = pb.pokemon(id)
            species = pb.pokemon_species(id)
            evolution_chain = pb.evolution_chain(species.evolution_chain.id)

            # Fetching abilities with hidden status
            abilities = [
                {"name": ability.ability.name, "isHidden": ability.is_hidden}
                for ability in pokemon.abilities
            ]

            # Gender ratio, convert to percentage
            male_ratio = 100 - (species.gender_rate * 12.5) if species.gender_rate != -1 else None
            female_ratio = species.gender_rate * 12.5 if species.gender_rate != -1 else None

            # Egg group and egg cycle
            egg_groups = [group.name for group in species.egg_groups]
            egg_cycle = f"Steps to hatch: {species.hatch_counter * 255}"

            # Base stats
            stats = {stat.stat.name: stat.base_stat for stat in pokemon.stats}
            base_stats = {
                "hp": stats["hp"],
                "attack": stats["attack"],
                "defense": stats["defense"],
                "specialAttack": stats["special-attack"],
                "specialDefense": stats["special-defense"],
                "speed": stats["speed"],
                "total": sum(stats.values()),
            }

            # Parse evolutions
            evolutions = self.parse_evolutions(evolution_chain.chain)

            # Fetching moves (same as before)
            moves = [
                {
                    "name": move.move.name,
                    "type": pb.move(move.move.name).type.name,
                    "power": getattr(pb.move(move.move.name), 'power', None),
                    "accuracy": getattr(pb.move(move.move.name), 'accuracy', None),
                    "levelLearnedAt": move.version_group_details[0].level_learned_at
                }
                for move in pokemon.moves
                if move.version_group_details[0].level_learned_at > 0
            ]

            # Preparing the final response data
            data = {
                "id": pokemon.id,
                "number": pad(pokemon.id),
                "image": f"https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/{pokemon.id}.png",
                "name": pokemon.name,
                "types": [t.type.name for t in pokemon.types],
                "about": {
                    "species": species.genera[7].genus,
                    "height": pokemon.height,
                    "weight": pokemon.weight,
                    "abilities": abilities,
                    "gender": {"male": male_ratio, "female": female_ratio},
                    "eggGroups": egg_groups,
                    "eggCycle": egg_cycle,
                },
                "baseStats": base_stats,
                "evolutions": evolutions,
                "moves": moves
            }

            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def parse_evolutions(self, chain):
        evolutions = []
        base_pokemon_name = chain.species.name
        base_pokemon_url = chain.species.url
        all_from_base = True

        # Add the base Pokémon
        evolutions.append({
            "name": base_pokemon_name,
            "evolutionMethod": "Base Form",
            "level": None,
            "methodImageUrl": None,
            "imageUrl": f"https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/{base_pokemon_url.split('/')[-2]}.png"
        })

        def get_evolution_method(details):
            item = getattr(details, 'item', None)
            trigger = getattr(details, 'trigger', None)

            if item:
                return item.name.title(), f"https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/items/{item.name}.png", None
            if trigger and trigger.name == "level-up" and getattr(details, 'min_happiness', None):
                return "High Friendship", None, None
            if trigger and trigger.name == "trade":
                return "Trade", None, None
            if trigger and trigger.name == "level-up" and getattr(details, 'known_move', None):
                return f"Knowing {details.known_move.name}", None, None
            if trigger and trigger.name == "time":
                return "Day" if details.time_of_day == "day" else "Night", None, None
            return "Level", None, getattr(details, 'min_level', 1)

        # Parse the evolution chain
        while chain:
            for evolution in chain.evolves_to:
                evolves_to_name = evolution.species.name
                evolves_to_url = evolution.species.url

                # Prioritize evolution methods using an item
                found_item_evolution = False

                for details in evolution.evolution_details:
                    evolution_method, method_image_url, level = get_evolution_method(details)

                    # If we find an item evolution, add it and skip other details
                    if details.item:
                        evolutions.append({
                            "name": evolves_to_name,
                            "evolutionMethod": evolution_method,
                            "level": level,
                            "methodImageUrl": method_image_url,
                            "imageUrl": f"https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/{evolves_to_url.split('/')[-2]}.png"
                        })
                        found_item_evolution = True
                        break  # We don't need to add non-item evolutions for the same Pokémon

                # If no item evolution was found, add the regular evolution
                if not found_item_evolution and not any(e['name'] == evolves_to_name for e in evolutions):
                    evolution_method, method_image_url, level = get_evolution_method(details)
                    evolutions.append({
                        "name": evolves_to_name,
                        "evolutionMethod": evolution_method,
                        "level": level,
                        "methodImageUrl": method_image_url,
                        "imageUrl": f"https://raw.githubusercontent.com/eidan66/pokemon-api-sprites/master/sprites/pokemon/other/official-artwork/{evolves_to_url.split('/')[-2]}.png"
                    })

                if base_pokemon_name != chain.species.name:
                    all_from_base = False

            chain = chain.evolves_to[0] if chain.evolves_to else None

        return {
            "evolutions_chain": evolutions,
            "all_from_base": all_from_base
        }
