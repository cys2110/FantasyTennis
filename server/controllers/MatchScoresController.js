const { MatchScore } = require('../models')

const getMatchByEdition = async(req, res) => {
    try {
        const { edition } = req.params
        const matches = await MatchScore.find({ edition: edition }).populate({path: 'player_1', select: ['full_name', 'headshot', 'country']}).populate({path: 'player_2', select: ['full_name', 'headshot', 'country']})
        const sorted = matches.toSorted((a, b) => {
            return a.match_no - b.match_no
        })
        if (sorted) {
            res.json(sorted)
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