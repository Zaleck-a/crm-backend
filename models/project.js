const { model, Schema } = require('mongoose');

const ProjectSchema = Schema({
    name: {
        type: String,
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dates:{
        type: [Date]
    },
    description:{
        type: String,
    },
    status:{
        type: String,
        default: 'Iniciado'
    },
    delete:{
        type: Boolean,
        default: false
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

ProjectSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
})


module.exports = model( 'Project', ProjectSchema);