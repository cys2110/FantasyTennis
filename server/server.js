const express = require('express')
const db = require('./db')
require('./passport')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

const app = express()
const session = require('express-session')
const passport = require('passport')

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next) {
    res.locals.user = req.user
    next()
})

app.get('/', (req, res) => {
    res.send('This is root!')
  })

app.get('/auth/google', passport.authenticate(
    'google',
    {
        scope: ['profile', 'email']
    }
))
app.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/',
        failureRedirect: '/'
    }
))

app.get('/logout', function(req, res) {
    req.logout(function() {
        res.redirect('/')
    })
})

app.listen(PORT, () => console.log(`Server running on ${PORT}`))