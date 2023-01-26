var mongoose = require("mongoose");

var SyllabusReturnedSchema = new mongoose.Schema({
        Code:{type:String},
        Plan:[{
            lecture:{type:String},
            CDFUnit:{type:String},
            topics:{type:String},
            material:{type:String},
            }
          ]

});

module.exports = mongoose.model("SyllabusReturned", SyllabusReturnedSchema);
