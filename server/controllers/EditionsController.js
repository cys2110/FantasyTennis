const { Edition } = require('../models')

const getEditionById = async(req, res) => {
    try {
        const { id } = req.params
        const editions = await Edition.findById(id)
        if (editions) {
            res.json(editions)
        } else {
            return res.status(404).send('Edition does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getEditionsByTournament = async(req, res) => {
    try {
        const { tournament } = req.params
        const editions = await Edition.find({ tournament: tournament })
        if (editions) {
            res.json(editions)
        } else {
            return res.status(404).send('Edition does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getEditionsByYear = async(req, res) => {
    try {
        const { year } = req.params
        const editions = await Edition.find({ year: year }).populate('tourney')
        const sorted = editions.toSorted((a, b) => {
            return a.start_date - b.start_date
        })
        if (sorted) {
            res.json(sorted)
        } else {
            return res.status(404).send('Edition does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getEditionById,
    getEditionsByTournament,
    getEditionsByYear
}