const db = require('../db')
const { MatchScore } = require('../models')
const matches = require('./datafiles/matchScore.json')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async() => {
    await MatchScore.insertMany(matches)
    console.log('inserted')
}

const run = async() => {
    await main()
    db.close()
}

run()