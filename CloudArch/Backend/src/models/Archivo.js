const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model= mongoose.model;

const archivoSchema = new Schema({
    name: String,
    type: String,
    path: String,
    user: String,
    createdDate: Date,
    content: String,
},
{
    versionKey: false
});

module.exports = model ('Archivo', archivoSchema);