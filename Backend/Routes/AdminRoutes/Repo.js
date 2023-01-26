var express = require("express");
var router = express.Router();
var Repo = require("../../Controler/AdminControllers/Repo");

router.route("/add").post(Repo.Add);
router.route("/show").get(Repo.Showall);
router.route("/showwithoutcat").get(Repo.Showwithoutcat);
router.route("/available").get(Repo.availablecodes);
router.route("/showcreatecat").get(Repo.Showallforcat);
router.route("/showupdatecat").get(Repo.ShowforUpdateCatalogdesc);
router.route("/showcreateCDF").get(Repo.ShowforCreateCDF);
router.route("/showupdateCDF").get(Repo.ShowforUpdateCDF);
router.route("/showcreateSyllabus").get(Repo.ShowforCreateSyllabus)
router.route("/showupdateSyllabus").get(Repo.ShowUpdateSyllabus)
router.route("/:id").delete(Repo.Delete).get(Repo.ShowOne).put(Repo.Update)

module.exports = router;
