var mongoose = require('mongoose');

var Base64 = new mongoose.Schema({   
    pdf:{
        type: String, 
        required:true
    },
});

module.exports = mongoose.model('Base64', Base64);