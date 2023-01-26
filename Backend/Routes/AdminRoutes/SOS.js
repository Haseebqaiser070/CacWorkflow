var express = require("express");
var router = express.Router();
var returnedSOS = require("../../Controler/AdminControllers/ReturnedSOS");
var SOS = require("../../Controler/AdminControllers/SOS");

router.route("/ReturnedSOS/:Program").get(returnedSOS.ViewOne);
router.route("/show").get(SOS.Showall);
router.route("/showallother").get(SOS.Showallother);
router.route("/Programs").get(SOS.Program)
router.route("/ProgramsHome").get(SOS.ProgramHome)
router.route("/Years/:Program").get(SOS.Year);
router.route("/Switch/:id").get(SOS.switchshowonoff);
router.route("/:id").delete(SOS.Delete).get(SOS.ShowOne);
router.route("/:Program/:Year").get(SOS.ShowOneProgramYear);

module.exports = router;
