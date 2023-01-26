var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email:{
    type:String,
      required: true,
      unique:true
    },
    Password:{
      type:String,
      required: true  
    },
    Phone:{
        type:String,
        required: true  
      },
    Activated:{
        type:Boolean,
        default:true
      },
      
    Roles:[
        {
        type: String, 
        required:true
    }]
    ,
    SOSCreation:{
      type:[
        {
        Program:{
        type: String,
        }
      }
    ],
    default:[]
    }
  ,
    CourseCreation:[
        {
        type: mongoose.Schema.ObjectId,
        ref: 'Repo',
        default:'none'
        }]
    ,
    CourseCDF:[
        {
        type: mongoose.Schema.ObjectId,
        ref: 'Repo',
        default:'none'
        }]
    ,
    CourseSyllabus:[
        {
        type: mongoose.Schema.ObjectId,
        ref: 'Repo',
        default:'none'
        }]
    ,
    CourseFolders:[
        {
        type: mongoose.Schema.ObjectId,
        ref: 'Folder',
        default:'none'
        }]
    ,
    EvaluateFolders:[
        {
        type: mongoose.Schema.ObjectId,
        ref: 'Eval',
        default:'none'
        }]
    
});

module.exports = mongoose.model('User', UserSchema);