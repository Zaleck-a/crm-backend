const path = require('path')
const fs = require('fs')

const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');

const fileUpload = ( req, res) => {


    const type = req.params.type;
    const id = req.params.id;

    // Validate types
    const validTypes = ['companies', 'customers', 'users'];
    if ( !validTypes.includes(type) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un usuario, cliente o empresa'
        });
    }


    // Validate that a file exists
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }


    // Process the image
    const file = req.files.image;
    const nameSplit = file.name.split('.');
    const fileExtencion = nameSplit[ nameSplit.length -1 ];

    
    const validExtencions = ['jpg', 'png', 'gif', 'jpeg'];
    if( !validExtencions.includes( fileExtencion )){
        return res.status(400).json({
            ok: false,
            msg: 'No es una extencion permitida'
        });
    }

    // Generate file name 
    const fileName = `${ uuidv4() }.${ fileExtencion }`;

    // Path to save image
    const path = `./uploads/${type}/${fileName}`;

    // Move the image or file
    file.mv( path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error en la imagen'
            });
        }


        // Update image BD
        updateImage( type, id, fileName );


        res.status(200).json({
            ok: true,
            msg: 'Imagen subida de manera exitosa',
            fileName
        });
    });


    
}


const returnImage = ( req, res) => {

    const type = req.params.type;
    const file = req.params.file;

    const pathImg = path.join( __dirname, `../uploads/${type}/${file}` );


    if ( fs.existsSync(pathImg) ){
        res.sendFile( pathImg);
    }else{
        const pathImg = path.join( __dirname, `../uploads/no-image.jpg` );
        res.sendFile( pathImg);
    }
    

}

module.exports = {
    fileUpload,
    returnImage
}