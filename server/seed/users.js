const db = require('../db')
const { User } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async() => {
    const user = new User({
        username: 'cys2110',
        password: 'password',
        email: 'csheridan2110@gmail.com'
    })
    await user.save()
    console.log(user)
}

const run = async() => {
    await main()
    db.close()
}

run()