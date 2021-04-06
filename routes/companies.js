/* 
    The Companies
    Root: /api/companies
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt');

const { getCompanies, createCompany, updateCompany, deleteCompany } = require('../controllers/companies');

const router = Router();

router.get('/', validateJWT, getCompanies);

router.post('/',
    [
        validateJWT,
        check('name', 'El nombre es necesario').not().isEmpty(),
        validateFields
    ],
    createCompany
);

 router.put('/:id', 
    [],
    updateCompany
);

router.delete('/:id', deleteCompany );

module.exports = router;

