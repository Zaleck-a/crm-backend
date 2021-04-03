const express = require('express');

require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config')

//Servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Base de datos
dbConnection();

console.log(process.env);

// Rutas
app.get('/', (req, res) => {
    res.status(400).json({
        ok: true,
        msg: 'Hola mundo'
    });
})


app.listen( process.env.PORT, () => {
    console.log('Servidor desde el puerto: ' + process.env.PORT);
})