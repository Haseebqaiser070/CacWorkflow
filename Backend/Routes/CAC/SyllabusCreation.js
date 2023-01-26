var express = require("express");
var router = express.Router();
var Syllabus = require("../../Controler/CAC/Syllabus/SyllabusCreation");

router.route("/get").get(Syllabus.showUsers);
router.route("/Submit/:Code").post(Syllabus.Submit);

module.exports = router;
