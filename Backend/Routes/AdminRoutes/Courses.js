var express = require("express");
var router = express.Router();
var courses = require("../../Controler/AdminControllers/Courses");
var returnedcourses = require("../../Controler/AdminControllers/ReturnedCourse");

router.route("/add").post(courses.Add);
router.route("/show").get(courses.Showall);
router.route("/ReturnedCourse/:Code").get(returnedcourses.ViewOne);
router.route("/:id").delete(courses.Delete).put(courses.Update).get(courses.ShowOne);
router.route("/bycode/:Code").get(courses.ViewOnebyCode);
router.route("/Authors/:Code").get(courses.ShowAuthors);

module.exports = router;
