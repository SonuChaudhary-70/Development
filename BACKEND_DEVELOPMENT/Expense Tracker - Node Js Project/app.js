const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const sequelize = require('./util/dbConfig');
const User = require('./model/user');
const Expenses = require('./model/expense');
const Orders = require('./model/order');
const ForgotPasswordReq = require('./model/ForgotPassword');
const homePageRoutes = require('./routes/home');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const premiumFeatureRoutes = require('./routes/premiumFeature')
const passwordRoutes = require('./routes/password');
const purchaseRoutes = require('./routes/purchase');
const userAuthentication = require('./middleware/authentication');
require('dotenv').config()

// DEFINE ASSOCIATIONs BETWEEN MODELS
// user and expenses associations ( 1:M ) => ( user: Expenses )
User.hasMany(Expenses)
Expenses.belongsTo(User, { constraint: true, onDelete: "CASCADE" });

// user and order association
User.hasMany(Orders);
Orders.belongsTo(User, { constraint: true, onDelete: "CASCADE" });

// user and ForgotPasswordRequests association
User.hasMany(ForgotPasswordReq);
ForgotPasswordReq.belongsTo(User, { constraint: true, onDelete: "CASCADE" });

// middleware which are used for all routes
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "script-src": ["'self'", "https://cdn.tailwindcss.com", "https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js", "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js", "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", "https://checkout.razorpay.com/v1/checkout.js", "https://code.jquery.com/jquery-3.5.1.min.js", "https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/datepicker.min.js", "https://cdn.jsdelivr.net/npm/apexcharts", "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"],
            "default-src": ["'self'", "*"]
        }
    }
}));
app.use(compression());
app.use(bodyParser.json());
app.use(express.static('public'))

// user routes for sign-up and login
app.use('/', homePageRoutes)
app.use('/user', userRoutes)
app.use('/password', passwordRoutes)
// adding external middleware which runs before going to any below routes
app.use('/expense', userAuthentication.authenticate, expenseRoutes)
app.use('/purchase', userAuthentication.authenticate, purchaseRoutes)
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