const {Router} = require('express')
const {usersGet, usersDelete, usersPost, usersPut} = require('../controllers/user')
const {check} = require('express-validator')
const { fieldsValidator } = require('../middlewares/validate-fields')
const {isValidRole, ifEmailExist, ifUserExist} = require('../helpers/dbValidators')
const validateJWT = require('../middlewares/validate-jwt')
const {isAdminRole, hasRole} = require('../middlewares/validate-role')

const router = Router()

router.get('/', usersGet)

router.put('/:id', [
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(ifUserExist),
    check('role').custom(isValidRole),
    fieldsValidator
],
usersPut)

router.post('/', [
    check('email', 'Not valid email').isEmail(),
    check('name', 'Name is required').notEmpty(),
    check('password', 'Password is required and greater than 6 characters').notEmpty().isLength({min: 6}),
    check('role').custom(isValidRole),
    check('email').custom(ifEmailExist),
    fieldsValidator
], 
usersPost)

router.delete('/:id', [ 
    validateJWT,
    isAdminRole,
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(ifUserExist),
    fieldsValidator
],
usersDelete)

module.exports = router