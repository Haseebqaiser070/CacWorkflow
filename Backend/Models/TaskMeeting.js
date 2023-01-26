var mongoose = require("mongoose");

var TaskMeetingSchema = new mongoose.Schema({
  dateTime: { type: String },
  taskType: [{ type: mongoose.Schema.Types.ObjectId, ref: "InitialTask"}],
  teacher_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("TaskMeeting", TaskMeetingSchema);
