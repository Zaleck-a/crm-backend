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


    const companies = await Company.find();

    res.status(200).json({
        ok: true,
        msg: 'Empresa actualizada'
    });
}

const deleteCompany = async (req, res) => {


    const companies = await Company.find();

    res.status(200).json({
        ok: true,
        msg: 'Empresa eliminada'
    });
}

module.exports = {
    getCompanies,
    createCompany,
    updateCompany,
    deleteCompany
}