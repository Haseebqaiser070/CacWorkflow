var express = require("express");
var router = express.Router();
var SOSpage1 = require("../../Controler/CAC/SOS/SOSpage1");

router.route("/add").post(SOSpage1.Add);
router.route("/show/:id").get(SOSpage1.ShowOne);
router.route("/:id").delete(SOSpage1.Delete)

module.exports = router;
