const db = require('../db')
const { Draw } = require('../models')
const editions = require('./datafiles/editions.json')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async() => {

  await Draw.insertMany(editions)
    console.log('inserted')
}

const run = async() => {
    await main()
    db.close()
}

run()