var express = require("express");
var router = express.Router();
var EvalFolder = require("../../Controler/Evaluator/FoldersEavlatorAssign");
var FoldersShow = require("../../Controler/Evaluator/FoldersShow");

router.route("/add").post(EvalFolder.Add);
router.route("/add2").post(EvalFolder.Add2);
router.route("/showUserCourses").get(FoldersShow.ShowCourses);
router.route("/showAll").get(FoldersShow.Showall);
router.route("/showAllforr").get(FoldersShow.ShowFolderforReport);
router.route("/showforReportser").get(FoldersShow.ShowEvaluatorsforReport);
router.route("/showAllbyid/:id").get(FoldersShow.ShowId);
router.route("/showComp/:id").get(FoldersShow.ShowComp);
router.route("/showfolder").get(FoldersShow.ShowFolder);

router.route("/finishAll").post(EvalFolder.FinishAll);
router.route("/finish/:id").post(EvalFolder.FinishOne);

module.exports = router;
