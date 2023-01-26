var mongoose = require('mongoose');

var BTLSchema = new mongoose.Schema({
    
    Number:{
    type:String,
      required: true,
      unique:true
    },
    BTL:{
      type:String,
      required: true  
    }
});

module.exports = mongoose.model('BTL', BTLSchema);