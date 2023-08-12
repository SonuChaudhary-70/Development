const express = require('express')
const http = require('http');
const app = express();

app.use((req, res, next) => {
    console.log('First middleware');
    next();
})
app.use((req, res, next) => {
    console.log('Second middleware');
    res.send('<h1> hello from node js </h1>');
})
http.createServer(app).listen(8080);