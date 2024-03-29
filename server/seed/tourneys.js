const db = require('../db')
const { Tournament } = require('../models')
const tournaments = require('./tournaments.json')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async() => {
    await Tournament.insertMany(tournaments)
    console.log('inserted')
}

const run = async() => {
    await main()
    db.close()
}

run()