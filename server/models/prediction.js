const { Schema } = require('mongoose')

const Prediction = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    edition: {type: Number, ref: 'Edition'},
    predictions: [
        {
            match: {type: Schema.Types.ObjectId, ref: 'MatchScore'},
            winner: {type: String, required: false},
            set1: [{type: Number, required: false}],
            tiebreak1: [{type: Number, required: false}],
            set2: [{type: Number, required: false}],
            tiebreak2: [{type: Number, required: false}],
            set3: [{type: Number, required: false}],
            tiebreak3: [{type: Number, required: false}],
            set4: [{type: Number, required: false}],
            tiebreak4: [{type: Number, required: false}],
            set5: [{type: Number, required: false}],
            tiebreak5: [{type: Number, required: false}]
        }
    ],
    points: {type: Number, required: true, default: 0}
})

module.exports = Prediction