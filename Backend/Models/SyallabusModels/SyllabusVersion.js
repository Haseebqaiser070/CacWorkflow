var mongoose = require("mongoose");

var SyllabusVersionSchema = new mongoose.Schema({
        Code:{type:String},
        Plan:[{
            lecture:{type:String},
            CDFUnit:{type:String},
            topics:{type:String},
            material:{type:String},
            }
          ]

});

module.exports = mongoose.model("SyllabusVersion", SyllabusVersionSchema);
