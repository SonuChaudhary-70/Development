const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/dbConfig');
const User = require('./model/user');
const Expenses = require('./model/expense');
const Orders = require('./model/order');
const ForgotPasswordReq = require('./model/ForgotPassword');
const homePageRoutes = require('./routes/home');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const orderRoutes = require('./routes/order');
const premiumFeatureRoutes = require('./routes/premiumFeature')
const passwordRoutes = require('./routes/password')
const userAuthentication = require('./middleware/authentication');
require('dotenv').config()

// DEFINE ASSoCIATIONs BETWEEN MODELS
// user and expenses associations ( 1:M ) => ( user: Expenses )
User.hasMany(Expenses)
Expenses.belongsTo(User, { constraint: true, onDelete: "CASCADE" });

// user and order association
User.hasMany(Orders);
Orders.belongsTo(User, { constraint: true, onDelete: "CASCADE" });

// user and ForgotPasswordRequests association
User.hasMany(ForgotPasswordReq);
ForgotPasswordReq.belongsTo(User,{ constraint: true, onDelete: "CASCADE" });

// middleware which are used for all routes
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'))

// user routes for sign-up and login
app.use('/', homePageRoutes)
app.use('/user', userRoutes)
app.use('/password', passwordRoutes)
// adding external middleware which runs before going to any below routes
app.use('/expense', userAuthentication.authenticate, expenseRoutes)
app.use('/purchase', userAuthentication.authenticate, orderRoutes)
app.use('/premium', userAuthentication.authenticate, premiumFeatureRoutes)

// server creation and connecting db with server
sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
        app.listen(process.env.PORT)
        console.log('\nserver is listening on port :', process.env.PORT);
        console.log('\nDb connected successfully');
    })
    .catch((err) => {
        console.log('Error while creating server :', err);
    })