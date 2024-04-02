const { Schema } = require('mongoose')

const User = new Schema({
    email: {type: String, required: true},
    username: {type: String, required: false},
    password: {type: String, required: false}
}, {timestamps: true})

module.exports = User