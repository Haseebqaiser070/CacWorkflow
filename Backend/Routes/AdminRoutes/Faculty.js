var express = require("express");
var router = express.Router();
var Faculty = require("../../Controler/AdminControllers/Faculty");

router.route("/add").post(Faculty.Add);
router.route("/show").get(Faculty.Showall);
router.route("/:id").delete(Faculty.Delete)/*.put(Faculty.Update).get(Faculty.ShowOne);*/
router.route("/LabReq/:id").post(Faculty.LabReq);
router.route("/TheoryReq/:id").post(Faculty.TheoryReq);
module.exports = router;
