const {response, request} = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const usersGet = async (req = request, res = response) => {

    const {limit = 5, skip = 0} = req.query
    const query = {status: true}

    const [totalUsers, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(skip))
        .limit(Number(limit))
    ])

    res.json({
        totalUsers,
        users
    })
}

const usersPost = async (req, res = response) => {
    const {name, email, password, role} = req.body
    const user = new User({name, email, password, role})

    //Encrypt pass
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    console.log({user});
    //Save in DB
    await user.save()
    
    res.json({
        user
    })
}

const usersPut = async (req,res = response) => {
    const id = req.params.id
    const {_id, password, google, email, ...rest} = req.body

    //Validate to DB
    if (password) {
        const salt = bcrypt.genSaltSync()
        rest.password = bcrypt.hashSync(password, salt)
    } 

    const user = await User.findByIdAndUpdate(id, rest)

    res.json(user)
}

const usersDelete = async (req,res = response) => {
    const {id} = req.params
    
    const deletedUser = await User.findByIdAndUpdate(id, {status: false})

    res.json(deletedUser)
}

module.exports = {usersGet, usersDelete, usersPost, usersPut}