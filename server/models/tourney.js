const { Schema } = require('mongoose')

const Tournament = new Schema(
    {
        _id: {type: Number, required: true},
        name: {type: String, required: true},
        start_year: {type: Number, required: true},
        end_year: {type: Number, required: false},
        active: {type: Boolean, required: true},
        website: {type: String, required: false}
    },
    {timestamps: true}
)

module.exports = Tournament