from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

from pokedexServer.views.pokemons.list_view import PokemonListView
from pokedexServer.views.pokemons.detail_view import PokemonDetailView
from pokedexServer.views.pokemons.info_view import PokemonInfoView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/pokemons/', PokemonListView.as_view(), name='pokemons-list'),
    path('api/pokemon/<int:id>/', PokemonDetailView.as_view(), name='pokemon-detail'),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/pokemon/info/<int:id>/', PokemonInfoView.as_view(), name='pokemon_info'),
    # Optional UI:
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

]