var mongoose = require("mongoose");

var SyllabusSchema = new mongoose.Schema({
        Program:{type:String},        
        Code:{type:String},
        Plan:[{
            lecture:{type:String},
            CDFUnit:{type:String},
            topics:{type:String},
            material:{type:String},
            }
          ]

});

module.exports = mongoose.model("Syllabus", SyllabusSchema);
