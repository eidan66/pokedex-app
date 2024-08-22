import express from 'express';
import pokemonController from '../../controllers/pokemons/index.js';

const routes = express.Router();

routes.route('/:name').get(async (req, res) => {
  const name = req.params.name;
  const pokemon = await pokemonController.getPokemonByName(name);
  res.end(JSON.stringify(pokemon));
});

routes.route('/').get(async (req, res) => {
  let offset = 0;
  let limit = 20;

  if (req.query.offset && typeof req.query.offset === 'string') {
    offset = parseInt(req.query.offset);
  }

  if (req.query.limit && typeof req.query.limit === 'string') {
    limit = parseInt(req.query.limit);
  }

  const pokemonsPage = await pokemonController.getPokemonsPage(offset, limit);
  res.end(JSON.stringify(pokemonsPage));
});

export default routes;
