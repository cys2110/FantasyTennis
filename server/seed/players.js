const db = require('../db')
const { Player } = require('../models')
const players = require('./datafiles/players.json')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async() => {
    const data = players.map(playerData => new Player(playerData))
    await Promise.all(data.map(player => player.save()))

    await Player.insertMany(data)
    console.log('inserted')
}

const run = async() => {
    await main()
    db.close()
}

run()