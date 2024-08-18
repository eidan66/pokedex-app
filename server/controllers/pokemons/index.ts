import { Pokemon, PokemonClient } from 'pokenode-ts';
import { APIPokemon, APIPokemonType, COLORS } from '../../models/pokemon/index.js';
import { APIPageResponse } from '../../models/response/index.js';

const api = new PokemonClient();

function pad(num: number) {
    if (num > 99) {
        return `#${num}`
    }

    if (num > 9) {
        return `#0${num}`
    }

    return `#00${num}`
}

function mapToAPIPokemonType(type: string): APIPokemonType {

    const apiType = Object.keys(APIPokemonType).find((s) => s.toLowerCase() === type.toLowerCase());    

    if (!apiType) {
        return APIPokemonType.Unknown;
    }
    
    return apiType as APIPokemonType;
}

function pokeAPIPokemonToAPIPokemon(pokeApiPokemon: Pokemon): APIPokemon {
    return {
        id: pokeApiPokemon.id,
        name: pokeApiPokemon.name,
        number: pad(pokeApiPokemon.id),
        types: pokeApiPokemon.types.map(({type:{name}})=> mapToAPIPokemonType(name)),
        boxBg: COLORS[mapToAPIPokemonType(pokeApiPokemon.types[0].type.name)],
        svg: `https://github.com/eidan66/pokemon-api-sprites/blob/master/sprites/pokemon/other/showdown/${pokeApiPokemon.id}.gif?raw=true`
    };
}

async function getPokemonsPage(offset: number, limit: number): Promise<APIPageResponse<APIPokemon>> {
    const pokemonsPage = await api.listPokemons(offset, limit);

    const apiPokemonsPage: APIPageResponse<APIPokemon> = {
        count: pokemonsPage.count,
        next: pokemonsPage.next?.replace('https://pokeapi.co/api/v2/pokemon', 'http://localhost:3000/pokemons'),
        previous: pokemonsPage.previous?.replace('https://pokeapi.co/api/v2/pokemon', 'http://localhost:3000/pokemons'),
        results: await Promise.all(pokemonsPage.results.map(async ({name}) => {
            const item = await api.getPokemonByName(pokemon.name);
    
            return pokeAPIPokemonToAPIPokemon(item);
        }))
    }

    return apiPokemonsPage;
}

async function getPokemonByName(name: string): Promise<APIPokemon> {
    const pokemon = await api.getPokemonByName(name);
    const apiPokemon = pokeAPIPokemonToAPIPokemon(pokemon);

    return apiPokemon;
}

export default { getPokemonsPage, getPokemonByName };