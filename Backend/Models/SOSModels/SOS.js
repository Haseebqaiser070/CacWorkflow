var mongoose = require("mongoose");

var SOSSchema = new mongoose.Schema({
    Page1:{
        type: mongoose.Schema.ObjectId,
        ref: 'SOSPage1'
    },
    Program: {
        type: String,
        required: true,
    },
    Year: {
        type: String,
        required: true,
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
            ref: 'ProgramCourses',}],
        Note:{ 
            type:String,
            default:""
        },}
    ],    
    required:true},
    showOutside:{
        type: Boolean,
        default:false
    }
});

module.exports = mongoose.model("SOS", SOSSchema);
