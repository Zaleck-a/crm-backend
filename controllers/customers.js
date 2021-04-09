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

    const id = req.params.id
    const userId = req.id
    

    try {

        const customer = await Customer.findById(id);

        if ( !customer ){
            return res.status(404).json({
                ok: false,
                msg: "Cliente no encontrado"
            });
        }

        const currentCustomer = {
            ...req.body,
            user: userId,
        }


        const customerUpdate = await Customer.findByIdAndUpdate( id, currentCustomer, { new: true } );

        res.status(200).json({
            ok: true,
            Customer: customerUpdate
        });
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Comunicate con el administrador'
        });

    }
}

const deleteCustomer = async (req, res) => {

    const id = req.params.id
    
    try {
        
        const customer = await Customer.findById(id);

        if ( !customer ){
            return res.status(404).json({
                ok: false,
                msg: "El cliente no fue encontrado"
            });
        }


        await Customer.findByIdAndDelete( id );

        res.status(200).json({
            ok: true,
            msg: "El cliente fue eliminado"
        });
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


module.exports = {
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
}