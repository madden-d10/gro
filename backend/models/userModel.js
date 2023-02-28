const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    layout: { type: Array }
})

module.exports = mongoose.model('users', userSchema)