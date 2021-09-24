const Role = require('../models/role')
const User = require('../models/user')

const isValidRole = async (role = '') => {
    const roleExist = await Role.findOne({role})
    if (!roleExist) {
        throw new Error(`Role ${role} is not a valid role`)
    }
}

const ifEmailExist = async(email = '') => {
    const emailExist = await User.findOne({email})
    if (emailExist) {
        throw new Error(`Email ${email} already exist`)
    }
}

const ifUserExist = async(id) => {
    const userExist = await User.findById(id)
    if (!userExist) {
        throw new Error(`User with id:${user} not exist`)
    }
}

module.exports = { isValidRole, ifEmailExist, ifUserExist }