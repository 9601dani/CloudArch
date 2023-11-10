const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model= mongoose.model;

const shareSchema = new Schema({
    name: String,
    type: String,
    path: String,
    user_shared: String,
    content: String,
    fecha_compartido: Date,
    hora_compartido: String,
    user: String,
},
{
    versionKey: false
});

module.exports = model ('Shared', shareSchema);