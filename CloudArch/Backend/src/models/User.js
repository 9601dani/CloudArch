const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model= mongoose.model;

const userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    rol: Number
},
{
    versionKey: false
});

module.exports = model ('Users', userSchema);