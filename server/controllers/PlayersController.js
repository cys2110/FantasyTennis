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

const filterEmptyObjects = (obj) => {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && Object.keys(obj[key]).length === 0) {
            delete obj[key]
        }
    }
    return obj
}

const createPlayer = async(req, res) => {
    try {
        const player = req.body
        const filteredPlayer = filterEmptyObjects(player)
        const newPlayer = new Player( filteredPlayer )
        await newPlayer.save()
        return res.status(201).json(newPlayer)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const editPlayer = async(req,res) => {
    try {
        const { id } = req.params
        const editedPlayer = await Player.findByIdAndUpdate(id, req.body, {new: true} )
        if (editedPlayer) {
            return res.status(200).json(editedUser)
        } else {
            throw new Error('Player not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getPlayerById,
    getPlayerByName,
    createPlayer,
    editPlayer
}