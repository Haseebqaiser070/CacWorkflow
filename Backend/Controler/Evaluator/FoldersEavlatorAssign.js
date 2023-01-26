var Evaldoc = require("../../Models/EvalFolder");
var Userdoc = require("../../Models/User");
const Mail = require("../../helpers/mailing");

module.exports.FinishOne = async (req, res) => {
  if (!req.user) return await res.status(401).json("Timed Out");
  if (!req.user.Roles.includes("Admin"))
    return await res.status(401).json("UnAutherized");
  const up = await Userdoc.findByIdAndUpdate(req.params.id, {
    EvaluateFolders: [],
  });
  await res.status(201).json(up);
};

module.exports.FinishAll = async (req, res) => {
  if (!req.user) return await res.status(401).json("Timed Out");
  if (!req.user.Roles.includes("Admin"))
    return await res.status(401).json("UnAutherized");
  var all = await Userdoc.find({});
  await Promise.all(
    all.map(async (e) => {
      const up = await Userdoc.findByIdAndUpdate(e._id, {
        EvaluateFolders: [],
      });
      console.log(up);
    })
  );
  await res.status(201).json("Anulled all");
};

module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin"))
      return await res.status(401).json("UnAutherized");
    var Folders = [];
    
    var already = false;
    await Promise.all(
      req.body.obj.map(async (e) => {
        try {
          var fold = await Evaldoc.findOne({
            Folder: e.Folders,
          });
          if (fold) already = true;
        } catch (er) {
          console.error(er);
        }
      })
    );
    if (already) return await res.status(401).json("Already Assigned");
    
    console.log("\nobj", req.body.obj);
    await Promise.all(
      req.body.obj.map(async (e) => {
        try {
          const fold = await Evaldoc.create({
            Folder: e.Folders,
            User: req.body.User,
            Evalutation: [],
          });
          console.log("\n\nfold", fold);
          Folders.push(fold);
          console.log("Folders", Folders);
        } catch (er) {
          console.error(er);
        }
      })
    );
    console.log("body", req.body);
    console.log("Folders", Folders);
    req.body.User.EvaluateFolders = [...Folders];
    const up = await Userdoc.findOneAndUpdate(
      { _id: req.body.User._id },
      req.body.User
    );
    console.log("User Updated", up);
    console.log("Folders", Folders);
    Mail.CourseAssign(req.body.obj, req.body.User.Email);
    await res.status(201).json(Folders);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Add2 = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin"))
      return await res.status(401).json("UnAutherized");

    const userF = await Userdoc.findById(req.body.User._id).populate(
      "EvaluateFolders"
    );

    var already = false;
    await Promise.all(
      req.body.obj.map(async (e) => {
        try {
          var fold = await Evaldoc.findOne({
            Folder: e.Folders,
          });
          if (fold) already = true;
        } catch (er) {
          console.error(er);
        }
      })
    );
    if (already) return await res.status(401).json("Already Assigned");
    
    var Folders = [];
    await Promise.all(
      userF.EvaluateFolders.map(async (i) => {
        try {
          var check = req.body.obj.some((e) =>
            i.Folder._id.equals(e.Folders._id)
          );
          console.log("Check", check);
          if (!check) {
            console.log("!Check");
            var r = await Evaldoc.deleteOne({ _id: i._id });
          } else if (check) {
            Folders.push(i);
          }
        } catch (er) {
          console.error(er);
        }
      })
    );
    console.log("\nFoldersffoldersffoldersffolders", Folders);

    await Promise.all(
      await req.body.obj.map(async (e) => {
        try {
          var check = Folders.some((i) => i.Folder._id.equals(e.Folders._id));
          console.log("Check", check);
          if (!check) {
            const fold = await Evaldoc.create({
              Folder: e.Folders,
              User: req.body.User,
              Evalutation: [],
            });
            Folders.push(fold);
          }
        } catch (er) {
          console.error(er);
        }
      })
    );
    req.body.User.EvaluateFolders = [...Folders];
    console.log(
      "\n\n\n\nDFinasfsknaskdnasdnFolders",
      req.body.User.EvaluateFolders
    );

    const up = await Userdoc.findOneAndUpdate(
      { _id: req.body.User._id },
      req.body.User
    );
    console.log("User Updated", up);
    console.log("Folders", Folders);
    Mail.CourseAssign(req.body.obj, req.body.User.Email);
    await res.status(201).json(Folders);
  } catch (err) {
    console.log(err);
  }
};
