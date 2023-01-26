var mongoose = require("mongoose");
var SOSPage1Schema = new mongoose.Schema({
    Program:{
        type: String
    },
    Year:{
        type: String
    },
    CoveredCategories:{
        type:[
            { Category:{ 
                 type:String
             },
             NoofCourses:{ 
                 type:String,
             },
            NoofCredits:{ 
                 type:String,
             }
            }
        ]
    },
    DomainCategories:{
        type:[
            { Category:{ 
                 type:String
             },
             NoofCourses:{ 
                 type:String,
             },
            NoofCredits:{ 
                 type:String,
             }
            }
        ]
    }
});

module.exports = mongoose.model("SOSPage1", SOSPage1Schema);
