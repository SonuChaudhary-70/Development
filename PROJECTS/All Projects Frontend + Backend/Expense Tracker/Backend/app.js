const express = require('express');
const app = express();
const expenseRoutes = require('./routes/expenseRoutes');
const cors = require('cors');
const sequelize = require('./util/db_connection');
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json());


app.use('/expense',expenseRoutes)

sequelize.sync()
.then(()=>{
    console.log('Server is running successfully');
    app.listen(7048)
})
.catch(err => {
    console.log('error',err);
})