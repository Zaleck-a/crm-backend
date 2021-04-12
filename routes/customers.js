/* 
    Customers
    Root: /api/customers
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt');

const { getCustomers, createCustomer, updateCustomer, deleteCustomer, getCustomer } = require('../controllers/customers');

const router = Router();

router.get('/', validateJWT, getCustomers);

router.post('/',
    [
        validateJWT,
        check('name', 'Es nombre del cliente es necesario').not().isEmpty(),
        check('company', 'El id de la compañia debe ser validado').isMongoId(),
        validateFields
    ],
    createCustomer
);

 router.put('/:id', 
    [
        validateJWT,
        check('name', 'Es nombre del cliente es necesario').not().isEmpty(),
        check('company', 'El id de la compañia debe ser validado').isMongoId(),
        validateFields
    ],
    updateCustomer
);

router.delete('/:id', 
    validateJWT,
    deleteCustomer
);

router.get('/:id', 
    validateJWT,
    getCustomer
);

module.exports = router;