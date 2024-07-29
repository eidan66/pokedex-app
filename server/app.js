const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Ok');
});

server.listen(3000);