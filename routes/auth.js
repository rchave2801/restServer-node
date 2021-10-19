const {Router} = require('express')
const {check} = require('express-validator')
const { loginController, googleSignIn } = require('../controllers/auth')
const { fieldsValidator } = require('../middlewares/validate-fields')

const router = Router()

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Email is required').not().isEmpty(),
    fieldsValidator
],
loginController)

router.post('/google', [
    check('id_token', 'Token is required').not().isEmpty(),
    fieldsValidator
],
googleSignIn)



module.exports = router