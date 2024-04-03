const mongoose = require('mongoose')
const UserSchema = require('./user')
const TournamentSchema = require('./tourney')
const { EditionSchema, DrawSchema } = require('./edition')
const MatchScoreSchema = require('./matchScore')
const PlayerSchema = require('./player')
const PredictionSchema = require('./prediction')
const PointSchema = require('./point')

const User = mongoose.model('User', UserSchema)
const Tournament = mongoose.model('Tournament', TournamentSchema)
const Edition = mongoose.model('Edition', EditionSchema)
const Draw = Edition.discriminator('Draw', DrawSchema)
const MatchScore = mongoose.model('Match Score', MatchScoreSchema)
const Player = mongoose.model('Player', PlayerSchema)
const Prediction = mongoose.model('Prediction', PredictionSchema)
const Point = mongoose.model('Points', PointSchema)

module.exports = {
    User,
    Tournament,
    Edition,
    Draw,
    MatchScore,
    Player,
    Prediction,
    Point
}