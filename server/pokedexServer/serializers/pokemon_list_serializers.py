from rest_framework import serializers

class PokemonListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    number = serializers.CharField(max_length=50)
    types = serializers.ListField(child=serializers.CharField(max_length=50))
    boxBg = serializers.CharField(max_length=100)
    svg = serializers.URLField()
    error = serializers.CharField(max_length=200, required=False)

