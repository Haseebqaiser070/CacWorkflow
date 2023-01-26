var mongoose = require('mongoose');
var LabContentsSchema = new mongoose.Schema({
    type:{
        type: String
    },
    Round1:{
        Assignment:{
            type:String
        },
        Deadline:{
            type:Date
        },
    },
    Round2:{
        Assignment:{
            type:String
        },
        Deadline:{
            type:Date
        },
    },
    Mid:{
        type:String
    }
});

module.exports = mongoose.model('LabContents', LabContentsSchema);