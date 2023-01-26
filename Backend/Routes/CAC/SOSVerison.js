var express = require("express");
var router = express.Router();
var SOSVerison = require("../../Controler/CAC/SOS/SOSVersion");

router.route("/add").post(SOSVerison.Add);
router.route("/all/:Program").get(SOSVerison.ViewAll);
router.route("/Latest/:Program").get(SOSVerison.Latest);
router.route("/:id").get(SOSVerison.ViewOne);

module.exports = router;
