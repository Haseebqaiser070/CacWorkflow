var mongoose = require("mongoose");

var FacultySchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  SecondName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Course: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Faculty", FacultySchema);
