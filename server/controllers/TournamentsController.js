const { Tournament } = require('../models')

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
    getTournamentById
}