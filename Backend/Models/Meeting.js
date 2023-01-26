var mongoose = require("mongoose");

var AvailabilitySchema = new mongoose.Schema({
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  time: { type: Object },
  
});

var MeetingSchema = new mongoose.Schema({
  dateTime: { type: String },
  taskType: [{  type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  teacher_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Meeting", MeetingSchema);
module.exports = mongoose.model("Availability", AvailabilitySchema);
