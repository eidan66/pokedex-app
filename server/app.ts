import * as http from 'http';
import MOCK_DATA from './data/mock-data.js'

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const MOCK_DATA_JSON = JSON.stringify(MOCK_DATA);
    res.end(MOCK_DATA_JSON);
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});