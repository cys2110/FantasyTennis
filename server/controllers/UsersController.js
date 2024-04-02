const { User } = require('../models')

const getAllUsers = async(req, res) => {
    try {
        const users = await User.find({})
        if (users) {
            res.json(users)
        } else {
            return res.status(404).send('User does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getUserByUsername = async(req, res) => {
    try {
        const { username } = req.params
        const user = await User.find({username: username})
        if (user) {
            res.json(user)
        } else {
            return res.status(404).send('User does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const createUser = async(req, res) => {
    try {
        const { user } = req.body
        const newUser = new User ( req.body )
        await newUser.save()
        return res.status(201).json(newUser)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllUsers,
    getUserByUsername,
    createUser
}