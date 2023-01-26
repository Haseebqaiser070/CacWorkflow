var mongoose = require("mongoose");
var CourseSchema = new mongoose.Schema({
  Code: {
    type: String,
    unique: true,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Credit: {
    type: String,
    required: true,
  },
  LectureHoursWeek: {
    type: String,
    required: true,
  },
  LabHoursWeek: {
    type: String,
    required: true,
  },
  
  PreRequisites:[
    { 
      type: mongoose.Schema.ObjectId,
      ref: 'Repo',
      default:'none'
    }
  ],

  catalogue: {
    type:String,
  },
  objectiveList: {
    type:[{
      id:{
        type:String
      },
      title:{
          type:String
        }
    }],
    required:true
  },
  Books:[{
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

module.exports = mongoose.model("Course", CourseSchema);
