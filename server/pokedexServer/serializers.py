# serializers.py

from rest_framework import serializers

class PokemonSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    number = serializers.CharField(max_length=50)
    types = serializers.ListField(child=serializers.CharField(max_length=50))
    boxBg = serializers.CharField(max_length=100)
    svg = serializers.URLField()
    error = serializers.CharField(max_length=200, required=False)

class PokemonDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    padded_id = serializers.CharField(max_length=10)
    types = serializers.ListField(child=serializers.CharField(max_length=50))
    color = serializers.CharField(max_length=50)
    sprite_url = serializers.URLField()