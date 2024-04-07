const express = require('express')
const db = require('./db')
require('./passport')
const { SECRET } = require('./config')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const tournamentController = require('./controllers/TournamentsController')
const playerController = require('./controllers/PlayersController')
const editionController = require('./controllers/EditionsController')
const matchScoreController = require('./controllers/MatchScoresController')
const userController = require('./controllers/UsersController')
const predictionController = require('./controllers/PredictionsController')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('This is root!')
  })

app.get('/tournaments/id/:id', tournamentController.getTournamentById)
app.post('/tournaments', tournamentController.createTournament)
app.patch('/tournaments/:id', tournamentController.editTournament)

app.get('/players/id/:id', playerController.getPlayerById)
app.get('/players/name/:name', playerController.getPlayerByName)
app.post('/players', playerController.createPlayer)
app.patch('/players/:id', playerController.editPlayer)

app.get('/editions/id/:id', editionController.getEditionById)
app.get('/editions/tournaments/:tournament', editionController.getEditionsByTournament)
app.get('/editions/year/:year', editionController.getEditionsByYear)
app.get('/editions/upcoming', editionController.getUpcomingEditions)
app.post('/editions', editionController.createEdition)
app.patch('/editions/:id', editionController.editEdition)

app.get('/match-scores/editions/:edition', matchScoreController.getMatchByEdition)
app.get('/match-scores/player/id/:id', matchScoreController.getMatchesByPlayerId)
app.post('/match-scores', matchScoreController.createMatch)
app.patch('/match-scores/:id', matchScoreController.updateMatch)

app.get('/users', userController.getAllUsers)
app.get('/users/username/:username', userController.getUserByUsername)
app.post('/users', userController.createUser)
app.patch('/users/:id', userController.editUser)
app.delete('/users/:id', userController.deleteUser)

app.get('/search/:search', tournamentController.universalSearch)

app.get('/predictions/id/:id', predictionController.getPredictionById)
app.get('/predictions/user/:user', predictionController.getPredictionsByUser)
app.get('/predictions/search', predictionController.getPredictionByUserAndEdition)
app.post('/predictions/create/:user/:edition', predictionController.createPrediction)
app.patch('/predictions/:id', predictionController.editPrediction)
app.delete('/predictions/:id', predictionController.deletePrediction)

app.listen(PORT, () => console.log(`Server running on ${PORT}`))