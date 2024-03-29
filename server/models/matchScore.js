const { Schema } = require('mongoose')

const MatchScore = new Schema(
    {
        edition: {type: Number, ref: 'Edition'},
        round: {type: String, required: false},
        match_no: {type: Number, required: false},
        player_1: {type: String, ref: 'Player'},
        player_1_full_name: {type: String, required: false},
        player_1_seed: {type: Number, required: false},
        player_1_status: {type: String, required: false, enum: ['Alt', 'LL', 'Q', 'SE', 'PR', 'WC']},
        player_1_rank: {type: Number, required: false},
        player_2: {type: String, ref: 'Player'},
        player_2_full_name: {type: String, required: false},
        player_2_seed: {type: Number, required: false},
        player_2_status: {type: String, required: false, enum: ['Alt', 'LL', 'Q', 'SE', 'PR', 'WC']},
        player_2_rank: {type: Number, required: false},
        winner: {type: Number, required: true},
        winner_id: {type: String, ref: 'Player'},
        duration_mins: {type: Number, required: false},
        bye: {type: Boolean, required: false},
        retirement: {type: Boolean, required: false},
        default: {type: Boolean, required: false},
        walkover: {type: Boolean, required: false},
        umpire: {type: String, required: false},
        date: {type: Date, required: false},
        score: {
            set1: [{type: Number, required: false}],
            tiebreak1: [{type: Number, required: false}],
            set2: [{type: Number, required: false}],
            tiebreak2: [{type: Number, required: false}],
            set3: [{type: Number, required: false}],
            tiebreak3: [{type: Number, required: false}],
            set4: [{type: Number, required: false}],
            tiebreak4: [{type: Number, required: false}],
            set5: [{type: Number, required: false}],
            tiebreak5: [{type: Number, required: false}],
        }
    },
    {timestamps: true}
)

module.exports = MatchScore