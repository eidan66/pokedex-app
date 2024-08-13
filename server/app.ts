import * as http from 'http';
import * as querystring from 'querystring';
import * as url from 'url';
import { Pokemon, PokemonClient } from 'pokenode-ts';

import COLORS from './colors.js';
import { APIPageResponse, APIPokemon, APIPokemonType } from './responseTypes.js';


const server = http.createServer(async (req, res) => {
    const api = new PokemonClient();

    if (req.url?.startsWith('/pokemons/')) {
        const name = req.url?.replace('/pokemons/', '');
        const pokemon = await api.getPokemonByName(name);

        const pokemonResponse = pokeAPIPokemonToAPIPokemon(pokemon);       
        
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(pokemonResponse))
    }

    if (req.url?.startsWith('/pokemons')) {
        const defaultOffset = 0;
        const defaultLimit = 20;
        let offset = defaultOffset;
        let limit = defaultLimit;

        const parsed = url.parse(req.url);
        if (parsed.query !== null) {
            const query  = querystring.parse(parsed.query);
            if (typeof query.offset === 'string' && query.offset) {
                offset = parseInt(query.offset);
            }

            if (typeof query.limit === 'string' && query.limit) {
                limit = parseInt(query.limit);
            }
        }
        
        try {
        const responseData: APIPageResponse<APIPokemon> = {
            count: 0,
            next: undefined,
            previous: undefined,
            results: []
        };

        const pokemonData = await api.listPokemons(offset, limit);
        responseData.count = pokemonData.count;
        responseData.next = pokemonData.next?.replace('https://pokeapi.co/api/v2/pokemon', 'localhost:3000/pokemons');
        responseData.previous = pokemonData.previous?.replace('https://pokeapi.co/api/v2/pokemon', 'localhost:3000/pokemons');
        responseData.results = await Promise.all(pokemonData.results.map(async pokemon => {
            const item = await api.getPokemonByName(pokemon.name);

            return pokeAPIPokemonToAPIPokemon(item);
        }));
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(responseData))
        } catch (error) {
        console.error(error);
        }
    }

    res.statusCode = 404;
    res.end();
});

server.listen(3001, () => {
    console.log('Server is running on port 3000');
});

function pad(num: number) {
    if (num > 99) {
        return `#${num}`
    }

    if (num > 9) {
        return `#0${num}`
    }

    return `#00${num}`
}

function pokeAPIPokemonToAPIPokemon(pokeApiPokemon: Pokemon): APIPokemon {
    return {
        pokemonName: pokeApiPokemon.name,
        pokemonNumber: pad(pokeApiPokemon.id),
        pokemonTypes: pokeApiPokemon.types.map(({type:{name}})=> mapToAPIPokemonType(name)),
        boxBg: COLORS[mapToAPIPokemonType(pokeApiPokemon.types[0].type.name)],
        pokemonSvg: `https://github.com/eidan66/pokemon-api-sprites/blob/master/sprites/pokemon/other/showdown/${pokeApiPokemon.id}.gif?raw=true`
    };
}

function mapToAPIPokemonType(type: string): APIPokemonType {

    const apiType = Object.keys(APIPokemonType).find((s) => s.toLowerCase() === type.toLowerCase());    

    if (!apiType) {
        return APIPokemonType.Unknown;
    }
    
    return apiType as APIPokemonType;
}