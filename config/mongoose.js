const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ERS');

const db = mongoose.connection;

db.on('error',function(error){
    console.log('There was an error opening the connection to DB',error)
});

db.once('open',function(){
    console.log('Successfully connected to DB')
});

module.exports = db;