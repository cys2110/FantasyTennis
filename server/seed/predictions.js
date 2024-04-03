const db = require('../db')
const { Prediction, User, MatchScore, Edition } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async() => {
    const user = await User.find({username: 'cys2110'})
    const match = await MatchScore.find({edition: 3392024, round: 'R32', match_no: 1})
    const prediction = new Prediction({
        user: user[0]._id,
        edition: 3392024,
        predictions: [
            {
                match: match[0]._id,
                winner: "r0dg",
                set1: [4,6],
                set2: [6,4],
                tiebreak2: [7, 5]
            }
        ]
    })

    await prediction.save()
    console.log(prediction)
}

const run = async() => {
    await main()
    db.close()
}

run()