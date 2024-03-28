const { Schema } = require('mongoose')

const Player = new Schema(
    {
        _id: {type: String, required: true},
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        full_name: {type: String},
        status: {
            active: {type: Boolean, required: true},
            turned_pro: {type: Number, required: false},
            retired: {type: Number, required: false}
        },
        country: {type: String, required: true},
        country_yr: {type: Number, required: false},
        prev_country: {type: String, required: false},
        prev_country_yr: {type: Number, required: false},
        birthday: {type: Date, required: false},
        right_handed: {type: Boolean, required: false},
        backhand: {type: Number, required: false},
        height: {
            cm: {type: Number, required: false},
            ft: {type: String, required: false}
        },
        coaches: [{type: String, required: false}],
        preferred_surface: {type: String, required: false, enum: ['grass', 'clay', 'hard', 'carpet']},
        age_started: {type: Number, required: false},
        rank: {
            career_high: {type: Number, required: false},
            date: {type: Date, required: false}
        },
        pm_USD: {type: Number, required: true},
        titles: {type: Number, required: true},
        win: {type: Number, required: true},
        loss: {type: Number, required: true},
        gladiator: {type: Boolean, required: true},
        headshot: {type: Boolean, required: true},
        majors: {
            ao: {
                round: {type: String, required: false},
                years: [{type: Number, required: false}]
            },
            rg: {
                round: {type: String, required: false},
                years: [{type: Number, required: false}]
            },
            wimbledon: {
                round: {type: String, required: false},
                years: [{type: Number, required: false}]
            },
            uso: {
                round: {type: String, required: false},
                years: [{type: Number, required: false}]
            },
            finals: {
                round: {type: String, required: false},
                years: [{type: Number, required: false}]
            },
            gs_cup: {
                round: {type: String, required: false},
                years: [{type: Number, required: false}]
            },
            olympics: {
                round: {type: String, required: false},
                years: [{type: Number, required: false}]
            },
            wct: {
                round: {type: String, required: false},
                years: [{type: Number, required: false}]
            },
            davis: {
                round: {type: String, required: false},
                years: [{type: Number, required: false}]
            },
            hopman: {
                round: {type: String, required: false},
                years: [{type: Number, required: false}]
            }
        }
    }
)

Player.pre('save', function(next) {
    this.full_name = `${this.first_name} ${this.last_name}`
    next()
})

module.exports = Player