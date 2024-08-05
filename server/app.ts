import * as http from 'http';
import * as querystring from 'querystring';
import * as url from 'url';
import COLORS from './colors.js';
import { PokemonClient } from 'pokenode-ts';

const server = http.createServer(async (req, res) => {
    const api = new PokemonClient();

    if (req.url?.startsWith('/pokemons/')) {
        const name = req.url?.replace('/pokemons/', '');
        const pokemon = await api.getPokemonByName(name);

        const pokemonResponse = {
            pokemonName: pokemon.name,
            pokemonNumber: pad(pokemon.id),
            pokemonTypes: pokemon.types.map(type => type.type.name),
            boxBg: COLORS[pokemon.types[0].type.name],
            pokemonSvg: `https://github.com/eidan66/pokemon-api-sprites/blob/master/sprites/pokemon/other/showdown/${pokemon.id}.gif?raw=true
`
        };       
        
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
            if (query.offset) {
                offset = parseInt(query.offset as string);
            }

            if (query.limit) {
                limit = parseInt(query.limit as string);
            }
        }
        
        try {
        const responseData = {} as {
            count: number,
            next:string | null | undefined,
            previous: string | null | undefined, 
            results: {pokemonName: string, pokemonNumber: string, pokemonTypes: string[], boxBg: string, pokemonSvg: string}[]
        };
        const pokemonData = await api.listPokemons(offset, limit);
        console.dir(pokemonData); 
        responseData.count = pokemonData.count;
        responseData.next = pokemonData.next?.replace('https://pokeapi.co/api/v2/pokemon', 'localhost:3000/pokemons');
        responseData.previous = pokemonData.previous?.replace('https://pokeapi.co/api/v2/pokemon', 'localhost:3000/pokemons');
        responseData.results = await Promise.all(pokemonData.results.map(async pokemon => {
            const item = await api.getPokemonByName(pokemon.name);

            return {
                pokemonName: item.name,
                pokemonNumber: pad(item.id),
                pokemonTypes: item.types.map(type => type.type.name),
                boxBg: COLORS[item.types[0].type.name],
                pokemonSvg: `https://github.com/eidan66/pokemon-api-sprites/blob/master/sprites/pokemon/other/showdown/${item.id}.gif?raw=true`
            };
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

server.listen(3000, () => {
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