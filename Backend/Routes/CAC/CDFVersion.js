var express = require("express");
var router = express.Router();
var CDFVersion = require("../../Controler/CAC/CDF/CDFVersions");

router.route("/add").post(CDFVersion.Add);
router.route("/all/:Code").get(CDFVersion.ViewAll);
router.route("/Latest/:Code").get(CDFVersion.Latest);
router.route("/:id").get(CDFVersion.ViewOne);

module.exports = router;
