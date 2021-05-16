const fs = require('fs')

const User = require('../models/user');
const Customer = require('../models/customer');
const Company = require('../models/company');

const deleteOldImage = ( path ) => {

    if( fs.existsSync( path )){
        fs.unlinkSync( path );
    }
}

let oldPath;

const updateImage = async ( type, id, fileName ) => {

    switch ( type ) {
        case 'customers':
            const customer = await Customer.findById(id);
            if( !customer ){
                console.log('No es un cliente');
                return false;
            }

            oldPath = `./uploads/customers/${ customer.img }`;
            deleteOldImage(oldPath);

            customer.img = fileName;
            await customer.save();
            return true;

        break;

        case 'companies':
            const company = await Company.findById(id);
            if( !company ){
                console.log('No es una compañia');
                return false;
            }

            oldPath = `./uploads/companies/${ company.img }`;
            deleteOldImage(oldPath);

            company.img = fileName;
            await company.save();
            return true;

        break;

        case 'users':
            const user = await User.findById(id);
            if( !user ){
                console.log('No es un usuario');
                return false;
            }

            oldPath = `./uploads/users/${ user.img }`;
            deleteOldImage(oldPath);

            user.img = fileName;
            await user.save();
            return true;

        break;

    }
    
}

module.exports = {
    updateImage
}