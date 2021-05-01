const User = require('../models/user')
const Customer = require('../models/customer')
const Company = require('../models/company')
const Project = require('../models/project')



const getSearch = async( req, res ) => {

    const search = req.params.search;
    const regex  = new RegExp( search, 'i');


    const [users, customers, companies] = await Promise.all([

        User.find({ name: regex }),
        Customer.find({ name: regex }),
        Company.find({ name: regex }),

    ]);


    return res.status(200).json({
        ok: true,
        users,
        customers,
        companies
    })
}

const getDocumentCollection = async( req, res ) => {

    const table = req.params.table;
    const search = req.params.search;
    const regex  = new RegExp( search, 'i');


    let data = [];

    switch ( table ) {
        case 'users':
            data = await User.find({ name: regex });

            break;

        case 'companies':
            data = await Company.find({ name: regex })
                                .populate('user', 'name email');
        
            break;
    
        case 'customers':
            data = await Customer.find({ name: regex })
                                 .populate('user', 'name email')
                                 .populate('company', 'name img');

        case 'projects':
        data = await Project.find({ name: regex })
                                .populate('user', 'name email')
                                .populate('customer', 'name');
        
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/clientes/compañias'
            });

    }

    res.json({
        ok: true,
        results: data
    })    
}


module.exports = {
    getSearch,
    getDocumentCollection,
}