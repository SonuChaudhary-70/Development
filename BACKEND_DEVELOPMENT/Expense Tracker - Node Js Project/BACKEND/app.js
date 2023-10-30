const express = require('express');
const app = express();
const userRoutes = require('./router/user');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/dbConfig')

// middleware used for all routes
app.use(cors());
app.use(bodyParser.json());

// user routes for sign-up and login
app.use('/user', userRoutes)

// server creation and connecting db with server
sequelize
// .sync({ force: true })
.sync()
    .then(() => {
        console.log('\nserver is listening on port : 4001');
        app.listen(4001)
    })
    .catch(err => {
        console.log('Error while creating server', err);
    })