from rest_framework import serializers

class PokemonSearchSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)  # The name of the Pokémon
    number = serializers.CharField(max_length=10)  # The padded number of the Pokémon
    id = serializers.CharField(max_length=10)  # The padded number of the Pokémon
    background_color = serializers.CharField(max_length=50)  # Background color based on the first type
    image = serializers.URLField()  # URL to the Pokémon image (GIF)