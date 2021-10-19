const { response } = require("express");
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const generateJWT = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/google-verify");

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


const googleSignIn = async(req, resp = response) => {
    const {id_token} = req.body

    try {
        const {name, email, img} = await googleVerify(id_token)

        let user = await User.findOne({email})
        if (!user) {
            //Create user
            const data = {
                email,
                name,
                password:':P',
                img,
                google: true
            }
            user = new User(data)
            await user.save()
        }

        //Validate user status
        if (!user.status) {
            return resp.status(401).json({
                msg: 'Blocked user'
            })
        }

        //Generate JWT
        const token = await generateJWT(user.id)
        resp.json({
            user,
            token
        })
    } catch (error) {
        resp.status(400).json({
            ok: false,
            msg: 'Token can be verified'
        })
    }
}

module.exports = {
    loginController,
    googleSignIn
}