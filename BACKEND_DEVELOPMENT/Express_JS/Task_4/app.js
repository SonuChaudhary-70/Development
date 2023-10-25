const express = require('express');
const app = express();
const loginRoutes = require('./routes/login');
const msgRoutes = require('./routes/msg');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));


app.use(loginRoutes)
app.use(msgRoutes);

// if none of above routes 
app.use((req, res,next) => {
    res.status(404).send('<h1>Page not found</h1>')
})

app.listen(7275)