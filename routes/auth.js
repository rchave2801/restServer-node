const {Router} = require('express')
const {check} = require('express-validator')
const { loginController } = require('../controllers/auth')
const { fieldsValidator } = require('../middlewares/validate-fields')

const router = Router()

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Email is required').not().isEmpty(),
    fieldsValidator
],
loginController)



module.exports = router