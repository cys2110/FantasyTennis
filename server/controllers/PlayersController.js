const { Player } = require('../models')

const getPlayerById = async(req, res) => {
    try {
        const { id } = req.params
        const players = await Player.findById(id)
        if (players) {
            res.json(players)
        } else {
            return res.status(404).send('Player does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getPlayerByName = async(req, res) => {
    try {
        const { name } = req.params
        const regex = new RegExp(name, 'i')
        const players = await Player.find({full_name: {$regex: regex}})
        if (players) {
            res.json(players)
        } else {
            return res.status(404).send('Player does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getPlayerById,
    getPlayerByName
}