var mongoose = require('mongoose');
var TheoryContentsSchema = new mongoose.Schema({
    type:{
        type: String
    },
    Round1:{
        Quiz:{
            type:String
        },
        Assignment:{
            type:String
        },
        Deadline:{
            type:Date
        },
    },
    Round2:{
        Quiz:{
            type:String
        },
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

module.exports = mongoose.model('TheoryContents', TheoryContentsSchema);