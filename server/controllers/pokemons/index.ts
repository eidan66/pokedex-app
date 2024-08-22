import { Pokemon, PokemonClient } from 'pokenode-ts';
import { PokemonModel, PokemonTypeModel, COLORS } from '../../models/pokemon/index.js';
import { APIPageResponse } from '../../models/response/index.js';
import { pad } from '../../utils/index.js';

const api = new PokemonClient();

const mapToPokemonTypeModel = (type: string): PokemonTypeModel => {
  const apiType = Object.keys(PokemonTypeModel).find((s) => s.toLowerCase() === type.toLowerCase());

  if (!apiType) {
    return PokemonTypeModel.Unknown;
  }

  return apiType as PokemonTypeModel;
};

const mapPokeAPIPokemonToPokemonModel = ({ id, name, types }: Pokemon): PokemonModel => {
  return {
    id,
    name,
    number: pad(id),
    types: types.map(({ type: { name } }) => mapToPokemonTypeModel(name)),
    boxBg: COLORS[mapToPokemonTypeModel(types[0].type.name)],
    svg: `https://github.com/eidan66/pokemon-api-sprites/blob/master/sprites/pokemon/other/showdown/${id}.gif?raw=true`,
  };
};

const getPokemonsPage = async (offset: number, limit: number): Promise<APIPageResponse<PokemonModel>> => {
  const pokemonsPage = await api.listPokemons(offset, limit);

  const apiPokemonsPage: APIPageResponse<PokemonModel> = {
    count: pokemonsPage.count,
    next: pokemonsPage.next?.replace('https://pokeapi.co/api/v2/pokemon', 'http://localhost:3000/pokemons'),
    previous: pokemonsPage.previous?.replace('https://pokeapi.co/api/v2/pokemon', 'http://localhost:3000/pokemons'),
    results: await Promise.all(
      pokemonsPage.results.map(async ({ name }) => {
        const item = await api.getPokemonByName(name);

        return mapPokeAPIPokemonToPokemonModel(item);
      }),
    ),
  };

  return apiPokemonsPage;
};

const getPokemonByName = async (name: string): Promise<PokemonModel> => {
  const pokemon = await api.getPokemonByName(name);
  const apiPokemon = mapPokeAPIPokemonToPokemonModel(pokemon);

  return apiPokemon;
};

export default { getPokemonsPage, getPokemonByName };
