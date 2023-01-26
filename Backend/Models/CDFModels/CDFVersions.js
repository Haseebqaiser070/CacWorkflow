var mongoose = require("mongoose");

var CDFVersionsSchema = new mongoose.Schema({
    Code:{type:String},
    Topics:{
        type:[{
            Unit:{
                type:String,
                }, 
            Topic:{
                type:String,
                },
            TeachingHours:{
                type:String,
                },
        }],
        required:true
    },
    CLOs:{
        type:[{
            sr:{
                type:String,
                },
                
            LaborTheory:{
                type:String,
                required:true},
                      
                
            Unit:{
                type:String,
                },
            CLO:{
                type:String,
                },
            BTL:[{
                type: mongoose.Schema.ObjectId,
                ref: 'BTL',}],
            So: [{
                type: mongoose.Schema.ObjectId,
                ref: 'SOO',}],
            Quizzes: {type:[{
                title:{
                type:String,
                }}]
            },
            Assignment:{type: [{
                title:{
                type:String,
              }}]},
            Mid: {
                type:String,
                },
            Final: {
                type:String,
                },
            Project: {
                type:String,
                default:""
                },
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

module.exports = mongoose.model("CDFVersions", CDFVersionsSchema);
