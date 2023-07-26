// import http (core module of node) and use to create server
const { log } = require('console');
const http = require('http');

let server = http.createServer((req, res) => {
    console.log('Sonu Chauhdary')
})

server.listen(3003)