/*

    ruta: /api/search/:all
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getSearch, getDocumentCollection } = require('../controllers/search');

const router = Router();



router.get('/:search', validateJWT, getSearch);

router.get('/collection/:table/:search', validateJWT, getDocumentCollection);





module.exports = router;