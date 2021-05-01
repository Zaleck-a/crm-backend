/* 
    The Projects
    Root: /api/projects
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projects');

const router = Router();

router.get('/', validateJWT, getProjects);

router.post('/',
    [
        validateJWT,
        check('name', 'El nombre es necesario').not().isEmpty(),
        validateFields
    ],
    createProject
);

 router.put('/:id', 
    [
        validateJWT,
        check('name', 'El nombre es necesario').not().isEmpty(),
        validateFields
    ],
    updateProject
);



router.delete('/:id',
    validateJWT,
    deleteProject 
);

module.exports = router;


