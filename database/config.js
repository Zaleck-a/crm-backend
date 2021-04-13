const mongoose = require('mongoose');

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('online');
    }catch(error){
        console.log(error);
        throw new Error('Failed to connect database');
    }
}


module.exports = {
    dbConnection,
}