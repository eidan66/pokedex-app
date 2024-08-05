import * as http from 'http';
import MOCK_DATA from './data/mock-data.js';

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/pokemons') {
    res.setHeader('Content-Type', 'application/json');
    const MOCK_DATA_JSON = JSON.stringify(MOCK_DATA);
    return res.end(MOCK_DATA_JSON);
  }

  res.statusCode = 404;
  res.end();
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
