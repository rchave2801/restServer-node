const fieldsValidator  = require('../middlewares/validate-fields')
const validateJWT = require('../middlewares/validate-jwt')
const rolesValidator = require('../middlewares/validate-role')

module.exports = {
    ...fieldsValidator,
    ...validateJWT,
    ...rolesValidator
}
