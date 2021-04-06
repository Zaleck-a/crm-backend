/* 
    Customers
    Root: /api/customers
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt');

const { getCustomers, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customers');

const router = Router();

router.get('/', getCustomers);

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
    [],
    updateCustomer
);

router.delete('/:id', deleteCustomer );

module.exports = router;