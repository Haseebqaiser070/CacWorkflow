var mongoose = require('mongoose');

var BTLDICSchema = new mongoose.Schema({
   
    BTL:{
        type: String, 
        required: true  
    },
    Domain:{
        type: String, 
        required: true  
    },
    Verbs:[
        {type:String}
    ]
    
});

module.exports = mongoose.model('BTLDIC', BTLDICSchema);