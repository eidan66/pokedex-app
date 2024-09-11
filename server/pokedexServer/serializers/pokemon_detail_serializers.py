from rest_framework import serializers

class PokemonDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    padded_id = serializers.CharField(max_length=10)
    types = serializers.ListField(child=serializers.CharField(max_length=50))
    color = serializers.CharField(max_length=50)
    sprite_url = serializers.URLField()

