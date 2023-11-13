const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/dbConfig');
const User = require('./model/user');
const Expenses = require('./model/expense');
const homePageRoute = require('./router/homePage');
const userRoutes = require('./router/user');
const expenseRoutes = require('./router/expense');
const port = 8001

// middleware used for all routes
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'))

// user routes for sign-up and login
app.use(homePageRoute)
app.use('/user', userRoutes)
app.use('/expense', expenseRoutes)

// user and expenses associations
User.hasMany(Expenses)
Expenses.belongsTo(User, { constraint: true, onDelete: "CASCADE" });

// server creation and connecting db with server
sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
        app.listen(port)
        console.log('\nserver is listening on port :', port);
        console.log('\nDb connected successfully');
    })
    .catch(err => {
        console.log('Error while creating server', err);
    })