const { MatchScore, Point, Prediction, User, Edition } = require('../models')

const getMatchByEdition = async(req, res) => {
    try {
        const { edition } = req.params
        const matches = await MatchScore.find({ edition: edition }).populate({
            path: 'player_1',
            select: ['full_name', 'headshot', 'country', 'first_name', 'last_name']
        }).populate({
            path: 'player_2',
            select: ['full_name', 'headshot', 'country', 'first_name', 'last_name']
        }).populate({
            path: 'edition',
            select: ['category', 'type_of_draw', 'tourney'],
            populate: {
                path: 'tourney',
                model: 'Tournament'
            }
        })
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

const createMatch = async(req, res) => {
    try {
        const match = req.body
        const newMatch = new MatchScore( match )
        await newMatch.save()
        return res.status(201).json(newMatch)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const updateMatch = async(req, res) => {
    try {
        const { id } = req.params
        const updatedMatch = await MatchScore.findByIdAndUpdate(id, req.body, {new: true})

        let finalScore = []
        let setCount = 0
        let gamesCount = 0

        for (let i = 1; i<=5; i++) {
            const set = updatedMatch.score[`set${i}`]
            const tiebreak = updatedMatch.score[`tiebreak${i}`]

            if (set.length > 0) {
                finalScore = finalScore.concat(set)
                setCount++
                gamesCount += set.reduce((acc, val) => acc + val, 0)
            }

            if (tiebreak.length > 0) {
                finalScore = finalScore.concat(tiebreak)
            }
        }
        const edition = await Edition.findById(updatedMatch.edition)
        const pointsMatrix = await Point.find({level: edition.category, round: updatedMatch.round})
        const predictions = await Prediction.find({"predictions.match": updatedMatch._id})
        const arraysAreEqual = (array1, array2) => {
            return array1.length === array2.length && array1.every((value, index) => value === array2[index])
        }
        for (let i=0; i < predictions.length; i++) {
            let predictedScore = []
            let predictedSets = 0
            let predictedGames = 0
            const predictionMatch = predictions[i].predictions.find(prediction => prediction.match.toString() === updatedMatch._id.toString());
            for (let n=1; n<=5; n++) {
                const predictedSet = predictionMatch[`set${n}`]
                const predictedTiebreak = predictionMatch[`tiebreak${n}`]

                if (predictedSet.length > 0) {
                    predictedScore = predictedScore.concat(predictedSet)
                    predictedSets++
                    predictedGames += predictedSet.reduce((acc, val) => acc + val, 0)
                }

                if (predictedTiebreak.length > 0) {
                    predictedScore = predictedScore.concat(predictedTiebreak)
                }
            }
            
            let predictionPoints = 0
            if (arraysAreEqual(finalScore, predictedScore)) {
                predictionPoints += pointsMatrix[0].score
            }
            if (setCount === predictedSets) {
                predictionPoints += pointsMatrix[0].sets
            }
            if (gamesCount === predictedGames) {
                predictionPoints += pointsMatrix[0].games
            }
            if (predictionMatch.winner === updatedMatch.winner_id) {
                predictionPoints += pointsMatrix[0].winner
            }
            const updatedPrediction = await Prediction.findByIdAndUpdate(predictions[i]._id, {$inc: {points: predictionPoints}}, {new: true})
            const user = await User.findByIdAndUpdate(predictions[i].user, {$inc: {points: predictionPoints}}, {new: true})
        }
        if (updatedMatch) {
            return res.status(200).json(updatedMatch)
        }
        throw new Error ('Match not found')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getMatchByEdition,
    createMatch,
    updateMatch
}