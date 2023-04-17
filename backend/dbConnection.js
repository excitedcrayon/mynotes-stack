const mongoose = require('mongoose');
const DB_URL = 'mongodb://110.232.113.228:27017';
const DB_NAME = 'mynotes';
const CONNECTION = `${DB_URL}/${DB_NAME}`;

const dbConnection = () => {
    mongoose.connect(CONNECTION, {
        useNewUrlParser: true
    });

    if(mongoose.connection){
        console.log(`DB Connection to ${DB_URL} is successful`);
    }
};

module.exports = { dbConnection };