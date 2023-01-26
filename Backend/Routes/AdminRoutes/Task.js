var express = require("express");
var router = express.Router();
var Task = require("../../Controler/AdminControllers/Tasks/Task");
var ReturnTasks = require("../../Controler/AdminControllers/Tasks/ReturnTasks");
var InitTask = require("../../Controler/AdminControllers/Tasks/InitTask")

router.route("/add").post(Task.Add);
router.route("/updateinside/:id").put(InitTask.UpdateInside)
router.route("/show").get(Task.Showall);
router.route("/show/:status").get(ReturnTasks.Showall);
router.route("/lock/:id").post(ReturnTasks.Lock);
router.route("/addInit").post(InitTask.Add);
router.route("/showInit").get(InitTask.Showall);
router.route("/showFinInit").get(InitTask.ShowallDone);
router.route("/ShowallReport").get(InitTask.ShowallReport);
router.route("/ShowOneReport/:id").get(InitTask.ShowOneReport);
router.route("/showOneInit/:id").get(InitTask.ShowOne);
router.route("/deleteInit/:id").delete(InitTask.Delete);
router.route("/updateInit/:id").put(InitTask.UpdateTaskInit);
router.route("/revision/:id").post(ReturnTasks.Revision);
router.route("/getUser").get(Task.showUsers)
router.route("/:id").delete(Task.Delete)

module.exports = router;
