var mongoose = require("mongoose");
var SOSVersionSchema = new mongoose.Schema({
    
    Page1:{
        type: mongoose.Schema.ObjectId,
        ref: 'SOSPage1'
    },
    Program: {
        type: String
    },
    Year: {
        type: String,
    },
    Categories:{type:[
       { Category:{ 
            type:String
        },
        Optional:{ 
            type:String,
            default:""
        },
        Track:{ 
            type:String,
            default:""
        },
        Courses:[{
            type: mongoose.Schema.ObjectId,
            ref: 'SOSCourse'}],
        Note:{ 
            type:String,
            default:""
        },
        }
    ],
    }

});

module.exports = mongoose.model("SOSVersion", SOSVersionSchema);
