var mongoose = require("mongoose");
var CategorySchema = new mongoose.Schema({

    CategoryName:{
        type:String,
        required:true
    },

});

module.exports = mongoose.model("Category", CategorySchema);
