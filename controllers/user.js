const {response, request} = require('express')

const usersGet = (req = request,res = response) => {
    
    const params = req.query

    res.json({
        msg:'API get',
        params
    })
}

const usersPost = (req,res = response) => {
    const body = req.body
    res.json({
        msg: 'Hola post',
        body
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