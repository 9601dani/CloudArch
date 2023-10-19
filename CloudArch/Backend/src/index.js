const express = require('express');
const { connect } = require('./configs/database.configs');

const app = express();
//Conexión a la base de datos
connect();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Inicio del servidor 
const server = app.listen(port, () => {
  console.log(`Escuchando desde el servior en el puerto ${port}`);
});



