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
        const newUser = new User ( user )
        await newUser.save()
        return res.status(201).json(newUser)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const editUser = async(req,res) => {
    try {
        const { id } = req.params
        const editedUser = await User.findByIdAndUpdate(id, req.body, {new: true} )
        if (editedUser) {
            return res.status(200).json(editedUser)
        } else {
            throw new Error('User not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const deleteUser = async(req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        if (user) {
            return res.status(200).send('User deleted')
        }
        throw new Error('User not found')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllUsers,
    getUserByUsername,
    createUser,
    editUser,
    deleteUser
}