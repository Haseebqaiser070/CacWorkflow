var mongoose = require('mongoose');

var EvalSchema = new mongoose.Schema({
    
    User:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    Folder:{
        type: mongoose.Schema.ObjectId,
        ref: 'Folder'
    },
    Evalutation:[
            {type:{
            Title:{
                type: String, 
                default:""
            },
            Title2:{
                type: String,
                default:"" 
                
            },
            Comments:{
                Name:{
                    type: String,
                    default:"" 
                },
                }
            }
        }    
    ],   
});

module.exports = mongoose.model('Eval', EvalSchema);