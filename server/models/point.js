const { Schema } = require('mongoose')

const Point = new Schema(
    {
        level: {type: String, required: true},
        round: {type: String, required: true},
        winner: {type: Number, required: true},
        score: {type: Number, required: true},
        games: {type: Number, required: true},
        sets: {type: Number, required: true}
    }
)

module.exports = Point