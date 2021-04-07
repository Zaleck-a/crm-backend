const User = require('../models/user');
const { response } = require ('express');
const bcrypt = require('bcryptjs');

const { generateJwt } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


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

        //Generate token
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

const googleSignIn = async ( req, res ) => {

    const googleToken = req.body.token;


    try {

        const { name, picture, email } = await googleVerify(googleToken);

        // User exists

        const userDB = await User.findOne({ email });

        let user;

        if ( !userDB ){
            user = new User({
                name,
                email,
                password: '***',
                img: picture,
                google: true
            });
        }else{
            user = userDB;
            user.google = true;
        }

        // Save DB
        await user.save();

        //Generate token
        const token = await generateJwt(user._id);


        res.status(200).json({
            ok: true,
            token
        })
        
        
    } catch (error) {
    
        res.status(401).json({
            ok: false,
            msg:'Invalid token!'
        })
        
    }

}

const renewToken = async ( req, res ) => {

    const id = req.id

    //Generate token
    const token = await generateJwt(id);

    res.json({
        ok: true,
        token
    })

}


module.exports = {
    login,
    googleSignIn,
    renewToken
}