const { Tournament, Player } = require('../models')

const universalSearch = async(req, res) => {
    try {
        const {search} = req.params
        const regex = new RegExp(search, 'i')
        const tournaments = await Tournament.find({ name: {$regex: regex} })
        const players = await Player.find({ full_name: {$regex: regex} })
        if ( tournaments || players ) {
            res.json({tournaments, players})
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getTournamentById = async(req, res) => {
    try {
        const { id } = req.params
        const tournaments = await Tournament.findById(id)
        if (tournaments) {
            res.json(tournaments)
        } else {
            return res.status(404).send('Tournament does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getTournamentById,
    universalSearch
}