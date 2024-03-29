const express = require('express')
const db = require('./db')
require('./passport')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const tournamentController = require('./controllers/TournamentsController')
const playerController = require('./controllers/PlayersController')
const editionController = require('./controllers/EditionsController')
const matchScoreController = require('./controllers/MatchScoresController')

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

app.get('/tournaments/:id', tournamentController.getTournamentById)

app.get('/players/id/:id', playerController.getPlayerById)
app.get('/players/name/:name', playerController.getPlayerByName)

app.get('/editions/id/:id', editionController.getEditionById)
app.get('/editions/tournaments/:tournament', editionController.getEditionsByTournament)

app.get('/match-scores/editions/:edition', matchScoreController.getMatchByEdition)
app.get('/match-scores/player/id/:id', matchScoreController.getMatchesByPlayerId)

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