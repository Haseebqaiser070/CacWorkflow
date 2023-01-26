var express = require("express");
var router = express.Router();
var Program = require("../../Controler/AdminControllers/Program");

router.route("/add").post(Program.Add);
router.route("/show").get(Program.Showall);
router.route("/showall/:Degree").get(Program.Showallwithdegree);
router.route("/showprefix").get(Program.ShowallPrefix);
router.route("/:id").delete(Program.Delete).put(Program.Update).get(Program.ShowOne);
router.route("/Reminder").post(Program.Reminder)
module.exports = router;
