const http = require('http');
const requestHandler = require('./routes.js')

http.createServer(requestHandler).listen(8080)

