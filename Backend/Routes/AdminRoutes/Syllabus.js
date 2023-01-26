var express = require("express");
var router = express.Router();
var Syllabus = require("../../Controler/AdminControllers/Syllabus");
var returnedsyllabus = require("../../Controler/AdminControllers/ReturnedSyllabus");

router.route("/show").get(Syllabus.Showall);
router.route("/ReturnedCourse/:Code").get(returnedsyllabus.ViewOne);
router.route("/showAllgen").get(Syllabus.Showallgen);
router.route("/showOnegen/:id").get(Syllabus.Showallgen);

router.route("/:id").delete(Syllabus.Delete).get(Syllabus.ShowOne);
router.route("/shower/:Code").get(Syllabus.Shower);
router.route("/showcodeandprogram/:Program/:Code").get(Syllabus.ShowbyProgramandCode);

module.exports = router;
