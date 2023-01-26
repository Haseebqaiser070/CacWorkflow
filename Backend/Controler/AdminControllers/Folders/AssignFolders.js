var Folderdoc = require("../../../Models/Folders");
var Userdoc = require("../../../Models/User");
const Mail = require("../../../helpers/mailing");
var Folders=require("../../../Models/Folders")

module.exports.FinishOne = async (req, res) => {
  if (!req.user) return await res.status(401).json("Timed Out");
  if (!req.user.Roles.includes("Admin"))
    return await res.status(401).json("UnAutherized");
  const up = await Userdoc.findByIdAndUpdate(req.params.id, {
    CourseFolders: [],
  });
  await res.status(201).json(up);
};

module.exports.deleteOne = async (req, res) => {
  if (!req.user) return await res.status(401).json("Timed Out");
  if (!req.user.Roles.includes("Admin"))
    return await res.status(401).json("UnAutherized");
    console.log("req.params",req.params)
   
    console.log("req.params.id",req.params.id)

    const folder = await Folders.findById(req.params.id).populate("Course")
    .populate("User").populate("Evaluator")

    const up = await Userdoc.findByIdAndUpdate(folder.User._id, {
    CourseFolders: [],
  });
   await Folders.deleteOne({_id:req.params.id})

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
        CourseFolders: [],
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
    console.log("\nobj", req.body.obj);
    var already = false;
    await Promise.all(
      req.body.obj.map(async (e) => {
        try {
          var fold = await Folderdoc.findOne({
            Program: e.Program,
            Course: e.Course,
            Section: e.Section,
          });
          if (fold){
            var ins = await Userdoc.find({CourseFolders:{$elemMatch:{fold}}})
            console.log(ins)
            if(ins.length>0){
              already = true;
            }
          }
        } catch (er) {
          console.error(er);
        }
      })
    );
    if (already) return await res.status(401).json("Already Assigned");
    await Promise.all(
      req.body.obj.map(async (e) => {
        try {
          const fold = await Folderdoc.create({
            Program: e.Program,
            Course: e.Course,
            Section: e.Section,
            User: req.body.User,
            files: [],
            LabTheory: "Theory",
          });
          console.log("\n\nfold", fold);
          Folders.push(fold);
          console.log("Folders", Folders);
          if (e.Course.LabHoursWeek != "0") {
            const foldlab = await Folderdoc.create({
              Program: e.Program,
              Course: e.Course,
              Section: e.Section,
              User: req.body.User,
              files: [],
              LabTheory: "Lab",
            });
            Folders.push(foldlab);
            console.log("\n\foldlab", foldlab);
            console.log("Folders", Folders);
          }
        } catch (er) {
          console.error(er);
        }
      })
    );
    console.log("body", req.body.obj);
    console.log("Folders", Folders);
    req.body.User.CourseFolders = [...Folders];
    const up = await Userdoc.findOneAndUpdate(
      { _id: req.body.User._id },
      req.body.User
    );
    console.log("User Updated", up);
    console.log("Folders", Folders);
    req.body.obj.map((item)=>{
      Mail.CourseAssign({Course:item.Course.Name+"-"+item.Course.Code,Program:item.Program,Section:item.Section}, req.body.User.Email);
    })
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
    var already = false;
    await Promise.all(
      req.body.obj.map(async (e) => {
        try {
          var fold = await Folderdoc.findOne({
            Program: e.Program,
            Course: e.Course,
            Section: e.Section,
          });
          if (fold){
            var ins = await Userdoc.find({CourseFolders:{$elemMatch:{fold}}})
            console.log(ins)
            if(ins.length>0){
              already = true;
            }
          }
        } catch (er) {
          console.error(er);
        }
      })
    );
    if (already) return await res.status(401).json("Already Assigned");
    const userF = await Userdoc.findById(req.body.User._id)
      .populate("CourseFolders")
      .populate({
        path: "CourseFolders",
        populate: { path: "Course", model: "ProgramCourses" },
      });

    var Folders = [];
    console.log("Course", req.body.obj[0].Course);
    await Promise.all(
      userF.CourseFolders.map(async (i) => {
        try {
          console.log("i.Course", i.Course);

          var check = req.body.obj.some(
            (e) => e.Section == i.Section && i.Course._id.equals(e.Course._id)
          );
          console.log("Check", check);
          if (!check) {
            await Folderdoc.deleteOne({ _id: i._id });
          } else if (check) {
            Folders.push(i);
          }
        } catch (er) {
          console.error(er);
        }
      })
    );
    // console.log("\nFoldersffoldersffoldersffolders", Folders);

    await Promise.all(
      await req.body.obj.map(async (e) => {
        try {
          var check = Folders.some(
            (i) => i.Course._id.equals(e.Course._id) && e.Section == i.Section
          );
          console.log("Check", check);
          if (!check) {
            const fold = await Folderdoc.create({
              Program: e.Program,
              Course: e.Course,
              Section: e.Section,
              User: req.body.User,
              files: [],
              LabTheory: "Theory",
            });
            Folders.push(fold);
            if (e.Course.LabHoursWeek != "0") {
              const foldlab = await Folderdoc.create({
                Program: e.Program,
                Course: e.Course,
                Section: e.Section,
                User: req.body.User,
                files: [],
                LabTheory: "Lab",
              });
              Folders.push(foldlab);
            }
          }
        } catch (er) {
          console.error(er);
        }
      })
    );
    req.body.User.CourseFolders = [...Folders];
    // console.log(
    //   "\n\n\n\nDFinasfsknaskdnasdnFolders",
    //   req.body.User.CourseFolders
    //    );

    const up = await Userdoc.findOneAndUpdate(
      { _id: req.body.User._id },
      req.body.User
    );
    // console.log("User Updated", up);
    Mail.CourseAssign(req.body.obj, req.body.User.Email);
    // console.log("Folders", Folders);
    await res.status(201).json(Folders);
  } catch (err) {
    console.log(err);
  }
};
