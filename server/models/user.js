const { Schema } = require('mongoose')

const User = new Schema({
    name: {type: String},
    googleId: {type: String, required: false},
    email: {type: String, required: true},
    username: {type: String, required: false},
    password: {type: String, required: false}
}, {timestamps: true})

module.exports = User