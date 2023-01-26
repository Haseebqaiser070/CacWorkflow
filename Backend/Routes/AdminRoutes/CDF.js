var express = require("express");
var router = express.Router();
var returnedCDF = require("../../Controler/AdminControllers/ReturnedCDF");
var CDF = require("../../Controler/AdminControllers/CDFs");


router.route("/ReturnedCourseCDF/:Code").get(returnedCDF.ViewOne);
router.route("/showAllgen").get(CDF.Showallgen);

router.route("/showOnegen/:id").get(CDF.ShowOnegen);

router.route("/show").get(CDF.Showall);
router.route("/shower/:Code").get(CDF.Shower);
router.route("/showOne/:Program/:Code").get(CDF.ShowerOne);

router.route("/:id").delete(CDF.Delete).get(CDF.ShowOne);{/*.put(CDF.Update)*/}
// router.route("/add").post(CDF.Add);
module.exports = router;
