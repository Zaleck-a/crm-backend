const jwt = require('jsonwebtoken');

const generateJwt = ( id ) => {


    return new Promise (( resolve, reject ) => {

        const payload = {
            id
        }
    
        jwt.sign( payload, process.env.JWT_SCRT, { 
            expiresIn: '12h'
         }, ( err, token ) => {
    
            if( err ){
                console.log(err);
                reject( 'No se pudo generar el JWT' );
            }else{
                resolve(token);
            }
    
         });

    });
}

module.exports = {
    generateJwt
}