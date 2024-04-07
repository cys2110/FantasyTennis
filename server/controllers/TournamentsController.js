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

const createTournament = async(req, res) => {
    try {
        const tourney = req.body
        const newTournament = new Tournament(tourney)
        await newTournament.save()
        return res.status(201).json(newTournament)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const editTournament = async(req, res) => {
    try {
        const { id } = req.params
        const editedTournament = await Tournament.findByIdAndUpdate(id, req.body, {new: true})
        if (editedTournament) {
            return res.status(200).json(editedTournament)
        } else {
            throw new Error('Tournament not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getTournamentById,
    universalSearch,
    createTournament,
    editTournament
}