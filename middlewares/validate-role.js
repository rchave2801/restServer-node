const {response} = require('express')


const isAdminRole = (req, resp = response, next) => {
    if(!req.user){
        return resp.status(500).json({
            msg:'Trying to validate role before token'
        })
    }

    const {role, name} = req.user
    if(role !== 'ADMIN_ROLE'){
        return resp.status(401).json({
            msg:'Not admin user'
        })
    }

    next()
}

const hasRole = (...roles) => {
    return (req, resp=response, next) => {
        if (!req.user) {
            return resp.status(500).json({
                msg:'Trying to validate role before token'
            })
        }if (!roles.includes(req.user.role)) {
            return resp.status(401).json({
                msg:`The service require one of these roles: ${roles}`
            })
        }

        next()
    }

}


module.exports = {isAdminRole, hasRole}