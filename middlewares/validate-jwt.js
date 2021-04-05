const jwt = require('jsonwebtoken');

const validateJWT = ( req, res, next) => {

    //Leer token
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No existe token en la peticion'
        })
    }

    try {

        const { id } = jwt.verify( token, process.env.JWT_SCRT);

        req.id = id


        next();
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    
}


module.exports = {
    validateJWT
}