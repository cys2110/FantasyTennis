const { Prediction, User, MatchScore } = require('../models')

const getPredictionsByUser = async(req, res) => {
    try {
        const { user } = req.params
        const predictions = await Prediction.find({user: user}).populate({
            path: 'edition',
            select: ['year', 'end_date', 'tourney', 'sponsor_name', 'category', 'start_date', 'location', 'type_of_draw'],
            populate: {
                path: 'tourney',
                model: 'Tournament'
            }
        }).populate({
            path: 'predictions',
            populate: {
                path: 'player_1',
                select: ['first_name', 'last_name', 'full_name', 'country', 'headshot']
            }
        }).populate({
            path: 'predictions',
            populate: {
                path: 'player_2',
                select: ['first_name', 'last_name', 'full_name', 'country', 'headshot']
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
            select: ['year', 'end_date', 'tourney', 'sponsor_name', 'category', 'start_date', 'location', 'type_of_draw'],
            populate: {
                path: 'tourney',
                model: 'Tournament'
            }
        }).populate({
            path: 'predictions.player_1',
            select: ['headshot', 'full_name', 'country', 'first_name', 'last_name'],
        }).populate({
            path: 'predictions.player_2',
            select: ['headshot', 'full_name', 'country', 'first_name', 'last_name'],
        }).populate({
            path: 'predictions.match',
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

const createPrediction = async(req, res) => {
    try {
        const { user, edition } = req.params
        const userId = await User.find({username: user})
        const matches = await MatchScore.find({edition: edition})
        const predictions = []
        for (let i=0; i < matches.length; i++) {
            const matchBoiler = {
                match: matches[i]._id,
                player_1: matches[i].player_1,
                player_2: matches[i].player_2
            }
            predictions.push(matchBoiler)
        }
        const newPrediction = new Prediction({
            user: userId[0]._id,
            edition: edition,
            predictions: predictions
        })
        await newPrediction.save()

        return res.status(201).json({newPrediction})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const editPrediction = async(req, res) => {
    try {
        const { id } = req.params
        const editedPrediction = await Prediction.findByIdAndUpdate(id, req.body, {new: true})
        if (editedPrediction) {
            return res.status(200).json(editedPrediction)
        } else {
            throw new Error('Prediction not found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const deletePrediction = async(req, res) => {
    try {
        const { id } = req.params
        const prediction = await Prediction.findByIdAndDelete(id)
        if (prediction) {
            return res.status(200).send('Prediction deleted')
        } else {
            throw new Error('Prediction not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getPredictionsByUser,
    getPredictionById,
    getPredictionByUserAndEdition,
    createPrediction,
    editPrediction,
    deletePrediction
}