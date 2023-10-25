const express = require('express');
const { connect } = require('./configs/database.configs');
const UserRoutes = require('./routes/users.routes');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//Conexión a la base de datos
connect();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api',UserRoutes);


//Inicio del servidor 
const server = app.listen(port, () => {
  console.log(`Escuchando desde el servior en el puerto ${port}`);
});



