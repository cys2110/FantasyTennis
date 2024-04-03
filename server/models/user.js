const { Schema } = require('mongoose')

const User = new Schema({
    email: {type: String, required: true},
    username: {type: String, required: false},
    password: {type: String, required: false},
    score: {type: Number, required: false}
}, {timestamps: true})

module.exports = User