const {Schema} = require('mongoose')

const options = {discriminatorKey: 'kind'}

const seedSchema = new Schema({
    seed: {type: Number, required: true},
    player: {type: String, ref: 'Player'},
    rank: {type: Number, required: false}
})

const matchStats = new Schema ({
    aces: {type: Number, required: false},
    dfs: {type: Number, required: false},
    serve1: {
        in: {type: Number, required: false},
        total: {type: Number, required: false}
    },
    serve1_won: {
        in: {type: Number, required: false},
        total: {type: Number, required: false}
    },
    serve2_won: {
        in: {type: Number, required: false},
        total: {type: Number, required: false}
    },
    bps_saved: {
        in: {type: Number, required: false},
        total: {type: Number, required: false}
    },
    serve_gms_played: {
        in: {type: Number, required: false},
        total: {type: Number, required: false}
    },
    return1: {
        in: {type: Number, required: false},
        total: {type: Number, required: false}
    },
    return2: {
        in: {type: Number, required: false},
        total: {type: Number, required: false}
    },
    bps_converted: {
        in: {type: Number, required: false},
        total: {type: Number, required: false}
    },
    return_gms_played: {
        in: {type: Number, required: false},
        total: {type: Number, required: false}
    },
    serve_won: {
        in: {type: Number, required: false},
        total: {type: Number, required: false}
    },
    return_won: {
        in: {type: Number, required: false},
        total: {type: Number, required: false}
    },
    total_won: {
        in: {type: Number, required: false},
        total: {type: Number, required: false}
    }
})

const roundSchema = new Schema (
    {
        no: {type: Number, required: false},
        p1: {
            player: {type: String, ref: 'Player'},
            seed: {type: Number, required: false},
            status: {type: String, required: false},
            win: {type: Boolean, required: false}
        },
        p2: {
            player: {type: String, ref: 'Player'},
            seed: {type: Number, required: false},
            status: {type: String, required: false},
            win: {type: Boolean, required: false}
        },
        score: {
            set1: {
                p1: {type: Number, required: true},
                p2: {type: Number, required: true},
                t1: {type: Number, required: false},
                t2: {type: Number, required: false}
            },
            set2: {
                p1: {type: Number, required: true},
                p2: {type: Number, required: true},
                t1: {type: Number, required: false},
                t2: {type: Number, required: false}
            },
            set3: {
                p1: {type: Number, required: false},
                p2: {type: Number, required: false},
                t1: {type: Number, required: false},
                t2: {type: Number, required: false}
            },
            set4: {
                p1: {type: Number, required: false},
                p2: {type: Number, required: false},
                t1: {type: Number, required: false},
                t2: {type: Number, required: false}
            },
            set5: {
                p1: {type: Number, required: false},
                p2: {type: Number, required: false},
                t1: {type: Number, required: false},
                t2: {type: Number, required: false}
            }
        },
        retirement: {type: Boolean, required: false},
        walkover: {type: Boolean, required: false},
        default: {type: Boolean, required: false},
        bye: {type: Boolean, required: false},
        umpire: {type: String, required: false},
        date: {type: Date, required: false}
    }
)

const infoSchema = new Schema({
    lda: {type: String, ref: 'Player'},
    lls: [{type: String, ref: 'Player'}],
    alts: [{type: String, ref: 'Player'}],
    wds: [{
        player: {type: String, ref: 'Player'},
        reason: {type: String, required: false}
    }],
    rets: [{
        player: {type: String, ref: 'Player'},
        reason: {type: String, required: false}
    }],
    wos: [{
        player: {type: String, ref: 'Player'},
        reason: {type: String, required: false}
    }]
})

const teamMatches = new Schema(
    {score: [{type: [Number], required: false}],
    retirement: {type: Boolean, required: false},
    walkover: {type: Boolean, required: false},
    default: {type: Boolean, required: false},
    winner_player: {type: String, ref: 'Player'},
    loser_player: {type: String, ref: 'Player'},
    winner_win: {type: Boolean, require: true}}
)

const Event = new Schema(
    {
        _id: {type: Number, required: true},
        year: {type: Number, required: true},
        tourney: {type: Number, required: true},
        event: {type: String, required: false},
        start: {type: Date, required: true},
        end: {type: Date, required: true},
        category: {type: String, required: false}
    },
    {timestamps: true}, options
)

Event.virtual('tournament', {
    ref: 'Tournament',
    localField: 'tourney',
    foreignField: '_id',
    justOne: true
})

Event.set('toJSON', {virtuals: true})

const ATP = new Schema ({
    pm: {type: Number, required: false},
    tfc: {type: Number, required: false},
    currency: {type: String, required: false},
    location: {
        venue: {type: String, required: false},
        city: {type: String, required: true},
        country: {type: String, required: true}
    },
    surface: {
        type: {type: String, required: true, enum: ['clay', 'grass', 'hard', 'carpet']},
        hard_type: {type: String, required: false},
        environment: {type: String, required: false, enum: ['Outdoor', 'Indoor']},
    },
    supervisors: [{type: String, required: false}],
    awards: [{
        round: {type: String, required: false},
        pm: {type: Number, required: false},
        pts: {type: Number, required: false}
    }],
    seeds: [{type: seedSchema, required: false}],
    entry_info: {type: infoSchema, required: false},
    final: roundSchema,
    sfs: [roundSchema],
    qfs: [roundSchema],
    r16: [roundSchema],
    r32: [roundSchema],
    r64: [roundSchema],
    r128: [roundSchema]
})

const United = new Schema({
    winner: {type: String, required: true},
    finalist: {type: String, required: true},
    tfc: {type: Number, required: false},
    currency: {type: String, required: false},
    location: {
        venue: {type: String, required: false},
        city: {type: String, required: true},
        country: {type: String, required: true}
    },
    surface: {
        type: {type: String, required: true, enum: ['clay', 'grass', 'hard', 'carpet']},
        hard_type: {type: String, required: false},
        environment: {type: String, required: false, enum: ['Outdoor', 'Indoor']},
    },
    supervisors: [{type: String, required: false}],
    groups: [{
        group: {type: String, required: true},
        location: {
            venue: {type: String, required: false},
            city: {type: String, required: true},
            country: {type: String, required: true}
        },
        standings: [{
            position: {type: Number, required: true},
            country: {type: String, required: true},
            lineup: [{type: String, ref: 'Player'}],
            tie: {
                w: {type: Number, required: true},
                l: {type: Number, required: true}
            },
            match: {
                w: {type: Number, required: true},
                l: {type: Number, required: true}
            },
            set: {
                w: {type: Number, required: true},
                l: {type: Number, required: true}
            },
            games: {
                w: {type: Number, required: true},
                l: {type: Number, required: true}
            }
        }],
        ties: [{
            winner: {type: String, required: true},
            loser: {type: String, required: true},
            score: {type: String, required: false},
            matches: teamMatches
        }]
    }],
    host_city_finals: {
        location: {
            venue: {type: String, required: false},
            city: {type: String, required: false},
            country: {type: String, required: true}
        },
        ties: [{
            no: {type: Number, required: false},
            winner: {type: String, required: false},
            loser: {type: String, required: false},
            score: {type: String, required: false},
            match: teamMatches
        }],
    },
    qfs: {
        location: {
            venue: {type: String, required: false},
            city: {type: String, required: false},
            country: {type: String, required: true}
        },
        ties: [{
            no: {type: Number, required: false},
            winner: {type: String, required: false},
            loser: {type: String, required: false},
            score: [{type: String, required: false}],
            match: teamMatches
        }],
    },
    sfs: [{
            no: {type: Number, required: true},
            winner: {type: String, required: true},
            loser: {type: String, required: true},
            score: {type: String, required: true},
            match: teamMatches
        }],
    final: {
        winner: {type: String, required: true},
        loser: {type: String, required: true},
        score: {type: String, required: true},
        match: teamMatches
    }
})

// const Laver = new Schema()

const ATPCup = new Schema({
    winner: {type: String, required: true},
    finalist: {type: String, required: true},
    tfc: {type: Number, required: false},
    currency: {type: String, required: false},
    surface: {
        type: {type: String, required: true, enum: ['clay', 'grass', 'hard', 'carpet']},
        hard_type: {type: String, required: false},
        environment: {type: String, required: false, enum: ['Outdoor', 'Indoor']},
    },
    supervisors: [{type: String, required: false}],
    pts: [{
        player_rank: {type: String, required: true},
        rounds: [{
            round: {type: String, required: true},
            opponent_rank: [{
                rank: {type: String, required: true},
                pts: {type: Number, required: true}
            }]
        }]
    }],
    groups: [{
        group: {type: String, required: true},
        location: {
            venue: {type: String, required: false},
            city: {type: String, required: true},
            country: {type: String, required: true}
        },
        standings: [{
            position: {type: Number, required: true},
            country: {type: String, required: true},
            lineup: [{type: String, ref: 'Player'}],
            tie: {
                w: {type: Number, required: true},
                l: {type: Number, required: true}
            },
            match: {
                w: {type: Number, required: true},
                l: {type: Number, required: true}
            },
            set: {
                w: {type: Number, required: true},
                l: {type: Number, required: true}
            },
            games: {
                w: {type: Number, required: true},
                l: {type: Number, required: true}
            }
        }],
        ties: [{
            winner: {type: String, required: true},
            loser: {type: String, required: true},
            score: {type: String, required: true},
            matches: [teamMatches]
        }]
    }],
    sfs: {
        location: {
            venue: {type: String, required: false},
            city: {type: String, required: false},
            country: {type: String, required: false}
        },
        ties: [{
            no: {type: Number, required: true},
            winner: {
                country: {type: String, required: true},
                lineup: [{type: String, ref: 'Player'}]
            },
            loser: {
                country: {type: String, required: true},
                lineup: [{type: String, ref: 'Player'}]
            },
            score: {type: String, required: true},
            matches: [teamMatches]
        }]
    },
    final: {
        location: {
            venue: {type: String, required: false},
            city: {type: String, required: false},
            country: {type: String, required: false}
        },
        winner: {
            country: {type: String, required: true},
            lineup: [{type: String, ref: 'Player'}]
        },
        loser: {
            country: {type: String, required: true},
            lineup: [{type: String, ref: 'Player'}]
        },
        score: {type: String, required: true},
        matches: [teamMatches]
    }
})

// const Davis = new Schema()

// const WTC = new Schema()

module.exports = {
    Event,
    ATP,
    United,
    ATPCup
}