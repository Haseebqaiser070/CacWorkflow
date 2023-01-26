var mongoose = require("mongoose");

var Progrm = new mongoose.Schema({
    Degree: {
        type: String,
        required: true,
    },
    Program: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Progrm", Progrm);
