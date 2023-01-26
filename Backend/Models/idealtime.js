
var mongoose = require("mongoose");

var IdealSchema = new mongoose.Schema({
    idealtime:[{
        id:{
          type:Number
        },
        day:{
          type:String
        }
        ,slot:[{
          type:String
        }]
    
      }]
  
});

module.exports = mongoose.model("Ideal", IdealSchema);
