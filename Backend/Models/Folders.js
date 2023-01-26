var mongoose = require("mongoose");

var FolderSchema = new mongoose.Schema({
  Program: {
    type: String,
    required: true,
  },
  Course: {
    type: mongoose.Schema.ObjectId,
    ref: "ProgramCourses",
  },
  Section: {
    type: String,
    default: "",
  },
  User: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  files: [
    {
      type: {
        Title: {
          type: String,
          required: true,
        },
        Question: {
          Name: {
            type: String,
            required: true,
          },
          Base64: {
            type: mongoose.Schema.ObjectId,
            ref: "Base64",
          },
        },
        Solution: {
          Name: {
            type: String,
            required: true,
          },
          Base64: {
            type: mongoose.Schema.ObjectId,
            ref: "Base64",
          },
        },
        Awardlist: {
          Name: {
            type: String,
            required: true,
          },
          Base64: {
            type: mongoose.Schema.ObjectId,
            ref: "Base64",
          },
        },
        Best: {
          Name: {
            type: String,
            required: true,
          },
          Base64: {
            type: mongoose.Schema.ObjectId,
            ref: "Base64",
          },
        },
        Average: {
          Name: {
            type: String,
            required: true,
          },
          Base64: {
            type: mongoose.Schema.ObjectId,
            ref: "Base64",
          },
        },
        Worst: {
          Name: {
            type: String,
            required: true,
          },
          Base64: {
            type: mongoose.Schema.ObjectId,
            ref: "Base64",
          },
        },
      },
      default: "none",
    },
  ],
  LabTheory: {
    type: String,
    default: "",
  },
  LectureDeliveryRecord: {
    type: mongoose.Schema.ObjectId,
    ref: "Base64",
    default: null,
  },
  ICEF: {
    type: mongoose.Schema.ObjectId,
    ref: "Base64",
    default: null,
  },
  Obe: {
    type: mongoose.Schema.ObjectId,
    ref: "Base64",
    default: null,
  },
  Round1: {
    type: Boolean,
    default: false,
  },
  Round2: {
    type: Boolean,
    default: false,
  },
  Evaluation: {
    type: [
      {
        title: {
          type: String,
        },
        clo_no: {
          type: String,
        },
        clo_correct: {
          type: Boolean,
        },
        btl_no: {
          type: String,
        },
        btl_correct: {
          type: Boolean,
        },
        Comments: {
          type: String,
        },
        Feedback: {
          type: String,
        },
      },
    ],
    default: "none",
  },
  Evaluated: {
    type: Boolean,
    default: false,
  },
  WantRevision:{
    type: Boolean,
    default: false,
  },
  Revision:{
    type: Boolean,
    default: false,
  },
  Evaluator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null
  },
});

module.exports = mongoose.model("Folder", FolderSchema);
