const { Prediction, User } = require('../models')

const getPredictionsByUser = async(req, res) => {
    try {
        const { user } = req.params
        const predictions = await Prediction.find({user: user}).populate({
            path: 'edition',
            select: ['year', 'end_date', 'tourney', 'sponsor_name', 'category', 'start_date', 'location'],
            populate: {
                path: 'tourney',
                model: 'Tournament'
            }
        })
        if (predictions) {
            res.json(predictions)
        } else {
            return res.status(404).send('No predictions made by this user')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getPredictionById = async(req, res) => {
    try {
        const { id } = req.params
        const prediction = await Prediction.findById(id).populate({
            path: 'edition',
            select: ['year', 'end_date', 'tourney', 'sponsor_name', 'category', 'start_date', 'location'],
            populate: {
                path: 'tourney',
                model: 'Tournament'
            }
        }).populate({
            path: 'predictions.match',
            populate: {
                path: 'player_1',
                select: ['headshot', 'full_name', 'country', 'first_name', 'last_name'],
                model: 'Player'
            }
        }).populate({
            path: 'predictions.match',
            populate: {
                path: 'player_2',
                select: ['headshot', 'full_name', 'country', 'first_name', 'last_name'],
                model: 'Player'
            }
        })
        if (prediction) {
            res.json(prediction)
        } else {
            return res.status(404).send('Prediction does not exist')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getPredictionByUserAndEdition = async(req, res) => {
    try {
        const { user, edition } = req.query
        const userId = await User.find({username: user})
        console.log(userId)
        const prediction = await Prediction.find({user: userId[0]._id, edition: edition})
        if (prediction) {
            res.json(prediction)
        } else {
            return res.status(404).send('No prediction found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    getPredictionsByUser,
    getPredictionById,
    getPredictionByUserAndEdition
}