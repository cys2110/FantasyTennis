const { MatchScore } = require('../models')

const getMatchByEdition = async(req, res) => {
    try {
        const { edition } = req.params
        const matches = await MatchScore.find({ edition: edition })
        if (matches) {
            res.json(matches)
        } else {
            return res.status(404).send('Match does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getMatchesByPlayerId = async(req, res) => {
    try {
        const { id } = req.params
        const matches = await MatchScore.find({ $or: [{player_1: id}, {player_2: id}] })
        if (matches) {
            res.json(matches)
        } else {
            return res.status(404).send('Match does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getMatchByEdition,
    getMatchesByPlayerId
}