const {response, request} = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const usersGet = (req = request,res = response) => {
    
    const params = req.query

    res.json({
        msg:'API get',
        params
    })
}

const usersPost = async (req, res = response) => {
    const {name, email, password, role} = req.body
    const user = new User({name, email, password, role})

    //Verify email

    //Encrypt pass
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    //Save in DB
    await user.save()
    
    res.json({
        msg: 'Hola post',
        user
    })
}

const usersPut = (req,res = response) => {
    const id = req.params.id
    res.json({
        msg:'API put',
        id
    })
}

const usersDelete = (req,res = response) => {
    res.json('Hello World')
}

module.exports = {usersGet, usersDelete, usersPost, usersPut}