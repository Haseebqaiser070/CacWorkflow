var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    taskType:{  
        type: String,
        required: true
    },
    User:[{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    Deadline:{    
        type: String,
        required: true
    },
    Status:{    
        type: String,
        required: true
    },
    Course :{
        type: mongoose.Schema.ObjectId,
        ref: 'Repo',
        default:null
        },
    Program : {
        type: String,
    },
    Comment: {
        type: String,
    }
});

module.exports = mongoose.model('Task', TaskSchema);












