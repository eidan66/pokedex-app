import express from 'express';

import pokemons from './pokemons/index.js';

const routes = express.Router();

routes.use('/pokemons', pokemons);

routes.use((req, res) => {
  res.statusCode = 404;
  res.end();
});

export default routes;
