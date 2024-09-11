from rest_framework import serializers

class AbilitySerializer(serializers.Serializer):
    name = serializers.CharField()
    isHidden = serializers.BooleanField()


class GenderSerializer(serializers.Serializer):
    male = serializers.FloatField(allow_null=True)
    female = serializers.FloatField(allow_null=True)


class AboutSerializer(serializers.Serializer):
    species = serializers.CharField()
    height = serializers.IntegerField()
    weight = serializers.IntegerField()
    abilities = AbilitySerializer(many=True)
    gender = GenderSerializer()
    eggGroups = serializers.ListField(child=serializers.CharField())
    eggCycle = serializers.CharField()


class BaseStatsSerializer(serializers.Serializer):
    hp = serializers.IntegerField()
    attack = serializers.IntegerField()
    defense = serializers.IntegerField()
    specialAttack = serializers.IntegerField()
    specialDefense = serializers.IntegerField()
    speed = serializers.IntegerField()
    total = serializers.IntegerField()


class EvolutionChainSerializer(serializers.Serializer):
    name = serializers.CharField()
    evolutionMethod = serializers.CharField()
    level = serializers.IntegerField(allow_null=True)
    imageUrl = serializers.URLField()
    methodImageUrl = serializers.URLField(allow_null=True)


class EvolutionAllFromBaseSerializer(serializers.Serializer):
    all_from_base = serializers.CharField()


class EvolutionSerializer(serializers.Serializer):
    evolutions_chain = EvolutionChainSerializer(many=True)
all_from_base = EvolutionAllFromBaseSerializer()

class PokemonInfoSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    number = serializers.IntegerField()
    image = serializers.URLField()
    name = serializers.CharField()
    types = serializers.ListField(child=serializers.CharField())
    about = AboutSerializer()
    evolutions = EvolutionSerializer()
    baseStats = BaseStatsSerializer()
