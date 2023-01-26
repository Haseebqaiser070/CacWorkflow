var mongoose = require("mongoose");

var CDFgeneralSchema = new mongoose.Schema({
    Code:{type:String},
    Topics:{
        type:[{
            Unit:{
                type:String,
                required:true}, 
            Topic:{
                type:String,
                required:true},
            TeachingHours:{
                type:String,
                required:true},
            
        }],
        required:true
    },
    CLOs:{
        type:[{
            sr:{
                type:String,
                required:true},
                
            LaborTheory:{
                type:String,
                required:true},
                    
            Unit:{
                type:String,
                required:true},
            CLO:{
                type:String,
                required:true},
            BTL:[{
                type: mongoose.Schema.ObjectId,
                ref: 'BTL',}],
            So: [{
                type: mongoose.Schema.ObjectId,
                ref: 'SOO',}],
            Quizzes: [{ title:{
                type:String,
              }}],
            Assignment: [{
                title:{
                    type:String,
                  }},],
            Mid: {
                type:String,
                default:""    
                },
            Final: {
                type:String,
                default:""    
                },
            Project: {
                type:String,
                default:""},
        }],required:true},
        textBook:[{
            id:{
              type:String
            },
            BookName: {
            type:String,
            },
            BookWriter: {
                type:String,
            },
            BookYear: {
                type:String,
            }}
          ],
        referenceBook:[{
            id:{
              type:String
            },
            BookName: {
            type:String,
            },
            BookWriter: {
                type:String,
            },
            BookYear: {
                type:String,
            }}
          ]

});

module.exports = mongoose.model("CDFgeneral", CDFgeneralSchema);
