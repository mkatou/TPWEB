const mongoose = require('mongoose');
const config = require('config');


const dbase = config.get('database');

const host = dbase.host || '127.0.0.1';
const port = dbase.port || '27017';
const dbName = dbase.dbName;

mongoose.Promise = global.Promise

mongoose.connect(
        'mongodb://' + host + ':' + port + '/' + dbName, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(() => console.log("Database connect on " + host + ":" + port + "/" + dbName))
    .catch((error) => console.log(error))


module.exports = mongoose