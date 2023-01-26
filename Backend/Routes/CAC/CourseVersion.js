var express = require("express");
var router = express.Router();
var CourseVersion = require("../../Controler/CAC/CoursesSOS/CourseVersion");

router.route("/add").post(CourseVersion.Add);
router.route("/all/:Code").get(CourseVersion.ViewAll);
router.route("/Latest/:Code").get(CourseVersion.Latest);
router.route("/:id").get(CourseVersion.ViewOne);

module.exports = router;
