const { Edition } = require('../models')

const getEditionById = async(req, res) => {
    try {
        const { id } = req.params
        const editions = await Edition.findById(id)
        .populate({
            path: 'winner',
            select: ['headshot', 'full_name', 'country']})
        .populate({
            path: 'finalist',
            select: ['headshot', 'full_name', 'country']})
        .populate('tourney')
        .populate({
            path: 'seeds.player',
            select: ['headshot', 'full_name', 'country']})
        .populate({
            path: 'entry_info.lda.player',
            select: ['headshot', 'full_name', 'country']})
        .populate({
            path: 'entry_info.lls',
            select: ['headshot', 'full_name', 'country']})
        .populate({
            path: 'entry_info.alts',
            select: ['headshot', 'full_name', 'country']})
        .populate({
            path: 'entry_info.wds.player',
            select: ['headshot', 'full_name', 'country']})
        .populate({
            path: 'entry_info.rets.player',
            select: ['headshot', 'full_name', 'country']}).
        populate({
            path: 'entry_info.wos.player',
            select: ['headshot', 'full_name', 'country']})
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
        const editions = await Edition.find({ tourney: tournament }).populate({path: 'winner', select: ['headshot', 'full_name', 'country']}).populate({path: 'finalist', select: ['headshot', 'full_name', 'country']})
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

const getEditionByPlayer = async(req, res) => {
    try {
        const { player } = req.params
        const wins = await Edition.find({winner: player}).populate('tourney')
        const finals = await Edition.find({finalist: player}).populate('tourney')
        if (wins || finals) {
            res.json ({wins, finals})
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getUpcomingEditions = async(req, res) => {
    try {
        const editions = await Edition.find({}).populate('tourney')
        const upcoming = editions.filter(edition => edition.end_date > Date.now())
        const sorted = upcoming.toSorted((a, b) => {
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

const filterEmptyObjects = (obj) => {
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            filterEmptyObjects(obj[key])
            if (Object.keys(obj[key].length === 0)) {
                delete obj[key]
            }
        } else if (obj[key] === '') {
            delete obj[key]
        }
    }
    return obj
}

const createEdition = async(req, res) => {
    try {
        const edition = req.body
        const filteredEdition = filterEmptyObjects(edition)
        const newEdition = new Edition( filteredEdition )
        await newEdition.save()
        return res.status(201).json(newEdition)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const editEdition = async(req,res) => {
    try {
        const { id } = req.params
        const editedEdition = await Edition.findByIdAndUpdate(id, req.body, {new: true} )
        if (editedEdition) {
            return res.status(200).json(editedEdition)
        } else {
            throw new Error('Edition not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getEditionById,
    getEditionsByTournament,
    getEditionsByYear,
    getUpcomingEditions,
    getEditionByPlayer,
    createEdition,
    editEdition
}