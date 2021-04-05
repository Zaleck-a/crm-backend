const User = require('../models/user');
const { response } = require ('express');
const bcrypt = require('bcryptjs');

const { generateJwt } = require('../helpers/jwt');


const login = async ( req, res = response) => {


    const { email, password } = req.body;

    try {
        
        // Validate email
        const userDB = await User.findOne({ email });

        if(!userDB){
            res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            })
        }

        // Validate password

        const validPassword = bcrypt.compareSync( password, userDB.password );
        if ( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Contrseña no valida'
            })
        }

        //Generar token
        const token = await generateJwt(userDB._id);

        res.status(200).json({
            ok: true,
            token
        })

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administreador'
        })
    }
}


module.exports = {
    login
}