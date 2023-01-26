var express = require("express");
var router = express.Router();
var SyllabusVerison = require("../../Controler/CAC/Syllabus/SyllabusVersion");

router.route("/add").post(SyllabusVerison.Add);
router.route("/all/:Code").get(SyllabusVerison.ViewAll);
router.route("/Latest/:Code").get(SyllabusVerison.Latest);
router.route("/:id").get(SyllabusVerison.ViewOne);

module.exports = router;
