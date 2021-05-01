const express = require('express');

require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Server express
const app = express();

//Configure CORS
app.use(cors());

//Read and parese the body
app.use( express.json() );

//Data base
dbConnection();

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/companies', require('./routes/companies'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/search', require('./routes/search'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));


app.listen( process.env.PORT, () => {
    console.log('Server on port: ' + process.env.PORT);
});