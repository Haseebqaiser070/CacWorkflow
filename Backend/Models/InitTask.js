var mongoose = require('mongoose');

var InitTaskSchema = new mongoose.Schema({
    taskType:{  
        type: String,
        required: true
    },
    AssignMember:[{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    Program:{    
        type: String,
        required: true
    },
    Task:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Task',
        default:'none'
    }]
});

module.exports = mongoose.model('InitialTask', InitTaskSchema);




