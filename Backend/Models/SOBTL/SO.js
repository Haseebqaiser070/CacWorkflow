var mongoose = require('mongoose');

var SOOSchema = new mongoose.Schema({
    
    Number:{
      type:String,
      required: true,
      unique:true
    },
    GA:{
        type:String,
        required: true,     
    },
    SO:{
      type:String,
      required: true  
    }
});

module.exports = mongoose.model('SOO', SOOSchema);