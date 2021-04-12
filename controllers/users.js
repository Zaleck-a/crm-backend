const User = require('../models/user')
const bcrypt = require('bcryptjs');
const { generateJwt } = require('../helpers/jwt');


const getUsers = async (req, res) => {

    const from = Number(req.query.from) || 0;

    const [users, total] = await Promise.all([
        User.find({}, 'name email role google img')
            .skip( from )
            .limit( 5 ),
        
        User.countDocuments()
    ]);


    res.status(200).json({
        ok: true,
        users,
        total
    });
}


const createUser = async (req, res) => {

    const { password, email } = req.body;

    try {
        const existUser = await User.findOne({ email });

        if(existUser){
            return res.status( 400 ).json({
                ok:false,
                msg: 'El correo ya esta registrado'
            });
        }

        const user = new User( req.body );

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();


        //Create token
        const token = await generateJwt( user._id );

        res.status(200).json({
            ok: true,
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        })
    }
}

const uptdateUser = async (req, res) => {

    const id = req.params.id;

    try {

        const userDB = await User.findById( id );
        
        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }


        // Update
        const { google, password, email, ...fields} = req.body;

        if( userDB.email !== email){
            const emailExist = await User.findOne({ email });

            if( emailExist ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        if( !userDB.google){

            fields.email = email;

        }else if( userDB.email !== email ){
            res.status(400).json({
                ok: false,
                msg: 'Usuarios de google no pueden cambiar su correo'
            })
        }

        const userUpdate = await User.findByIdAndUpdate( id, fields, { new: true } );


        res.json({
            ok: true,
            user: userUpdate
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const deleteUser = async ( req, res ) => {


    const id = req.params.id

    try {

        const userDB = await User.findById( id );
        
        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await User.findByIdAndDelete( id );
        
        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        })

    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Error inesperado, comuniquese con el administrador'
        })
    }

    
}

module.exports = {
    getUsers,
    createUser,
    uptdateUser,
    deleteUser,
}