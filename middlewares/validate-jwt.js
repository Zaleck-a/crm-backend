const jwt = require('jsonwebtoken');

const User = require('../models/user')

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

const validateAdminRol = async ( req, res, next) => {

    const id = req.id;

    try {

        const userDB = await User.findById(id);

        if ( !userDB ){
            return res.status(404).json({
                ok: false,
                msg: 'El ususario no existe'
            })
        }

        if ( userDB.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene los privilegios necesarios'
            })
        }

        next();
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const validateAdminRolOrSameUser = async ( req, res, next) => {

    const id = req.id;
    const idParams = req.params.id;

    try {

        const userDB = await User.findById(id);

        if ( !userDB ){
            return res.status(404).json({
                ok: false,
                msg: 'El ususario no existe'
            })
        }

        if ( userDB.role === 'ADMIN_ROLE' || id === idParams){

            next();

        }else{
            return res.status(403).json({
                ok: false,
                msg: 'No tiene los privilegios necesarios'
            })
            
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    validateJWT,
    validateAdminRol,
    validateAdminRolOrSameUser
}