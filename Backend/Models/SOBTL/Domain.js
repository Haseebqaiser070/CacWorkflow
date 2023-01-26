var mongoose = require('mongoose');

var DomainSchema = new mongoose.Schema({   
    Domain:{
      type:String,
      required: true  
    }
});

module.exports = mongoose.model('Domain', DomainSchema);