var express = require("express");
var router = express.Router();
const BTL = require("../../Controler/AdminControllers/SOBTL/BTL");
const SO = require("../../Controler/AdminControllers/SOBTL/SO");
const BTLDIC = require("../../Controler/AdminControllers/SOBTL/BTLDictionary");
const Domain = require("../../Controler/AdminControllers/SOBTL/Domain");

router.route("/addBTL").post(BTL.Add);
router.route("/addSO").post(SO.Add);
router.route("/addBTLDic").post(BTLDIC.Add);
router.route("/addDomain").post(Domain.Add);
router.route("/showBTL").get(BTL.Showall);
router.route("/showSO").get(SO.Showall);
router.route("/showBTLDic").get(BTLDIC.Showall);
router.route("/showDomain").get(Domain.Showall);
router.route("/BTL/:id").delete(BTL.Delete).put(BTL.Update).get(BTL.ShowOne);
router.route("/SO/:id").delete(SO.Delete).put(SO.Update).get(SO.ShowOne);
router.route("/BTLDic/:id").delete(BTLDIC.Delete).put(BTLDIC.Update).get(BTLDIC.ShowOne);
router.route("/Domain/:id").delete(Domain.Delete).put(Domain.Update).get(Domain.ShowOne);

module.exports = router;
