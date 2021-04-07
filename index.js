const express = require('express');

require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config')

//Servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y parese del body
app.use( express.json() );

//Base de datos
dbConnection();

//Public file
app.use( express.static('public') );

// Rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/companies', require('./routes/companies'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/search', require('./routes/search'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));


app.listen( process.env.PORT, () => {
    console.log('Servidor desde el puerto: ' + process.env.PORT);
})