var express = require("express");
var router = express.Router();
var UserAssigedFolders = require("../../Controler/AdminControllers/Folders/UserAssigedFolders");

router.route("/showAll").get(UserAssigedFolders.Showall);
router.route("/showUserCourses").get(UserAssigedFolders.ShowCourses);
router.route("/showAllbyid/:id").get(UserAssigedFolders.ShowId);
module.exports = router;
