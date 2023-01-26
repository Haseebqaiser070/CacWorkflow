var mongoose = require('mongoose');

var DeadlineLabSchema = new mongoose.Schema({
    
    Request_id:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    
    pending:{
        type:Boolean
    }
    ,
    Round:{
        type:String
    },
    Deadline:{
        type:String
    },
    DeadlineDate:{
        type:Date
    },
    Type:{
        type:String
    }
});

module.exports = mongoose.model('DeadlineLab', DeadlineLabSchema);