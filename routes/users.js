/* 
    Root: /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { getUsers, createUser, uptdateUser, deleteUser } = require('../controllers/users.js');
const { validateJWT, validateAdminRol, validateAdminRolOrSameUser } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getUsers);

router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validateFields
    ],
    createUser
);

 router.put('/:id', 
    [
        validateJWT,
        validateAdminRolOrSameUser,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validateFields
    ],
    uptdateUser
);

router.delete('/:id', [validateJWT, validateAdminRol], deleteUser);

module.exports = router;

