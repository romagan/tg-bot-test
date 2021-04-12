const { Schema, model } = require('mongoose');

const User = new Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    birth: {type: String, required: true},
});

module.exports = model('User', User);
