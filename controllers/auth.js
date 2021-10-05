const { response } = require("express");
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const generateJWT = require("../helpers/generateJWT");

const loginController = async(req, res = response) => {

    const {email, password} = req.body
    try {

        //validate email
        const user = await User.findOne({email})
        console.log({password});
        console.log({user});
        if(!user){
            return res.status(400).json({
                msg: 'user / password incorrect - mail'
            })
        }

        //validate user
        if(!user.status){
            return res.status(400).json({
                msg: 'user / password incorrect - status'
            })
        }
        
        //validate password
        const validPass = bcrypt.compareSync(password, user.password)
        if(!validPass){
            return res.status(400).json({
                msg: 'user / password incorrect - password'
            })
        }

        //generate JWT
        const token = await generateJWT(user.id)

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error'
        })
    }

}

module.exports = {loginController}