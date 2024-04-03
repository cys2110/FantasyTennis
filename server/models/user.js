const { Schema } = require('mongoose')

const User = new Schema({
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    points: {type: Number, required: false}
}, {timestamps: true})

module.exports = User