const { Schema } = require('mongoose')

const options = {discriminatorKey: 'kind'}

const Edition = new Schema(
    {
        _id: {type: Number, required: true},
        tourney: {type: Number, ref: 'Tournament'},
        year: {type: Number, required: true},
        sponsor_name: {type: String, required: false},
        start_date: {type: Date, required: false},
        end_date: {type: Date, required: false},
        category: {type: String, required: false},
        currency: {type: String, required: false},
        prize_money: {type: Number, required: false},
        tfc: {type: Number, required: false},
        supervisors: [{type: String, required: false}]
    },
    {timestamps: true}, options
)

const Draw = new Schema(
    {
        type_of_draw: {type: Number, required: true, enum: [32, 64, 128]},
        location: {
            venue: {type: String, required: false},
            city: {type: String, required: true},
            country: {type: String, required: true}
        },
        surface: {
            environment: {type: String, required: false},
            type: {type: String, required: true, enum: ['clay', 'carpet', 'hard', 'grass']},
            hard_type: {type: String, required: false}
        },
        winner: {type: String, ref: 'Player'},
        finalist: {type: String, ref: 'Player'},
        final_score: {type: String, required: false},
        awards: {
            winner: {
                prize_money: {type: Number, required: false},
                points: {type: Number, required: false}
            },
            finalist: {
                prize_money: {type: Number, required: false},
                points: {type: Number, required: false}
            },
            semifinalist: {
                prize_money: {type: Number, required: false},
                points: {type: Number, required: false}
            },
            quarterfinalist: {
                prize_money: {type: Number, required: false},
                points: {type: Number, required: false}
            },
            round4: {
                prize_money: {type: Number, required: false},
                points: {type: Number, required: false}
            },
            round3: {
                prize_money: {type: Number, required: false},
                points: {type: Number, required: false}
            },
            round2: {
                prize_money: {type: Number, required: false},
                points: {type: Number, required: false}
            },
            round1: {
                prize_money: {type: Number, required: false},
                points: {type: Number, required: false}
            }
        },
        seeds: [
            {
                seed: {type: Number, required: false},
                player: {type: String, ref: 'Player'},
                rank: {type: Number, required: false}
            }
        ],
        entry_info: {
            lda: {
                player: {type: String, ref: 'Player'},
                rank: {type: Number, required: false}
            },
            lls: [{type: String, ref: 'Player'}],
            alts: [{type: String, ref: 'Player'}],
            wds: [
                {
                    player: {type: String, ref: 'Player'},
                    reason: {type: String, required: false}
                }
            ],
            rets: [
                {
                    player: {type: String, ref: 'Player'},
                    reason: {type: String, required: false}
                }
            ],
            wos: [
                {
                    player: {type: String, ref: 'Player'},
                    reason: {type: String, required: false}
                }
            ]
        }
    }
)

module.exports = {
    Edition,
    Draw
}