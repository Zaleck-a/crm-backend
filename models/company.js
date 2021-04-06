const { model, Schema } = require('mongoose');

const CompanySchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { collection: 'companies'});

CompanySchema.method('toJSON', function(){
    const { __v, password, ...object } = this.toObject();
    return object;
})


module.exports = model( 'Company', CompanySchema);