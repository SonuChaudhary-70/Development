const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/dbConfig');
const User = require('./model/user');
const Expenses = require('./model/expense');
const Orders = require('./model/order');
const homePageRoute = require('./routes/home');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const orderRoutes = require('./routes/order');
const port = 8001;
const userAuthentication = require('./middleware/authentication');

// middleware used for all routes
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'))

// user routes for sign-up and login
app.use(homePageRoute)
app.use('/user', userRoutes)
// adding external middleware which runs before going to expense routes
app.use('/expense', userAuthentication.authenticate, expenseRoutes)
app.use('/purchase', userAuthentication.authenticate, orderRoutes)

// user and expenses associations ( 1:M ) => ( user: Expenses )
User.hasMany(Expenses)
Expenses.belongsTo(User, { constraint: true, onDelete: "CASCADE" });

// user and order association
User.hasMany(Orders);
Orders.belongsTo(User, {constraint:true, onDelete: "CASCADE"});

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