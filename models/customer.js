const { model, Schema } = require('mongoose');

const CustomerSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    project:{
        type: Schema.Types.ObjectId,
        ref: 'Project',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    }
});

CustomerSchema.method('toJSON', function(){
    const { __v, password, ...object } = this.toObject();
    return object;
})


module.exports = model( 'Customer', CustomerSchema);