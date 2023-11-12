const mongoose = require('mongoose');
const host = 'db';
const port = '27017';
const database = 'cloud-arch';

async function connect() {
  try {
    const db= await mongoose.connect(`mongodb://${host}:${port}/${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4
    });
    console.log(`Conectado a la base de datos -> ${database}`);
  } catch (error) {
    console.log(error);
  }
  
}

module.exports = { 
    connect 
};
