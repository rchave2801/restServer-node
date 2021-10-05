const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: 'There is no token'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETKEY)

        //Read user by uid
        const user = await User.findById(uid)

        if (!user) {
            return res.status(401).json({
                msg: 'Invalid token'
            })
        }

        //Validate if user status is true
        if (!user.status) {
            return res.status(401).json({
                msg: 'Invalid token'
            })
        }

        req.user = user
        req.uid = uid
        
        next()
    } catch (error) {
        console.log({error});
        res.status(401).json({
           msg: 'Not valid token' 
        })
    }
}

module.exports = {validateJWT}