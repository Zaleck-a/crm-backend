const Company = require('../models/company')


const getCompanies = async (req, res) => {

    const companies = await Company.find()
                                   .populate('user', 'nombre email');

    res.status(200).json({
        ok: true,
        companies
    });
}


const createCompany = async (req, res) => {

    const id = req.id;
    const company = new Company({
        user: id,
        ...req.body
    });
    

    try {
        
        const companyDB = await company.save();


        res.status(200).json({
            ok: true,
            company: companyDB
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })   
    }
}

const updateCompany = async (req, res) => {

    const id = req.params.id
    const userId = req.id

    try {
        const companies = await Company.findById(id);

        if ( !companies ){
            return res.status(404).json({
                ok: false,
                msg: "Empresa no encontrada"
            });
        }

        const currentCompany = {
            ...req.body,
            user: userId,
        }


        const companyUpdate = await Company.findByIdAndUpdate( id, currentCompany, { new: true } );

        res.status(200).json({
            ok: true,
            Comany: companyUpdate
        });
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
        
    }
}

const deleteCompany = async (req, res) => {

    const id = req.params.id
    
    try {
        
        const company = await Company.findById(id);

        if ( !company ){
            return res.status(404).json({
                ok: false,
                msg: "Empresa no encontrada"
            });
        }


        await Company.findByIdAndDelete( id );

        res.status(200).json({
            ok: true,
            msg: "Empresa eliminada"
        });
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

    

module.exports = {
    getCompanies,
    createCompany,
    updateCompany,
    deleteCompany
}