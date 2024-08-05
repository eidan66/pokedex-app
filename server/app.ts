import * as http from 'http';
import * as querystring from 'querystring';
import * as url from 'url';
import COLORS from './colors.js';
import { PokemonClient } from 'pokenode-ts';

const server = http.createServer(async (req, res) => {
    
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
        
        const api = new PokemonClient();

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
            let pokemonNumber =  pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');

            return {
                pokemonName: item.name,
                pokemonNumber,
                pokemonTypes: item.types.map(type => type.type.name),
                boxBg: COLORS[item.types[0].type.name],
                pokemonSvg: `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/showdown/${pokemonNumber}.gif?raw=true`
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