var express = require("express");
var router = express.Router();
var CDF = require("../../Controler/CAC/CDF/CDFCreation");

router.route("/get").get(CDF.showUsers);
router.route("/Submit/:Code").post(CDF.Submit);


module.exports = router;
