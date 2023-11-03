const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model= mongoose.model;

const carpetaSchema = new Schema({
    user: String,
    path: String,
    name: String,
    createdDate: Date
},
{
    versionKey: false
});

module.exports = model ('Carpeta', carpetaSchema);