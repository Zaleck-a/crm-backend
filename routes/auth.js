/*
    Path: '/api/login'
*/

const { Router } = require('express');

const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields')
const { login } = require('../controllers/auth')

const router = Router();




router.post('/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validateFields
    ],
    login
)






module.exports = router;