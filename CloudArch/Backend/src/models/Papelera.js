const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model= mongoose.model;

const papeleraSchema = new Schema({
    name: String,
    type: String,
    path: String,
    user: String,
    content: String,
    tipo_eliminacion: String,
},
{
    versionKey: false
});

module.exports = model ('Papelera', papeleraSchema);