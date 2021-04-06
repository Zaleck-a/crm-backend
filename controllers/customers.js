const Customer = require('../models/customer');

const getCustomers = async (req, res) => {

    const customers = await Customer.find()
                                    .populate('user', 'name')
                                    .populate('company', 'name');

    res.status(200).json({
        ok: true,
        customers
    });
}

const createCustomer = async (req, res) => {

    const id = req.id
    const customer = new Customer({
        user: id,
        ...req.body
    });


    try {
        const customerDB = await customer.save();

        res.status(200).json({
            ok: true,
            customer: customerDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comunicate con el administrador'
        })
    }
}

const updateCustomer = async (req, res) => {


    res.status(200).json({
        ok: true,
        msg: 'Cliente actualizado'
    });
}

const deleteCustomer = async (req, res) => {


    res.status(200).json({
        ok: true,
        msg: 'Cliente eliminado'
    });
}


module.exports = {
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
}