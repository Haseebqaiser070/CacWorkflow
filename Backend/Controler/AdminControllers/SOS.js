var SOS = require("../../Models/SOSModels/SOS");
var SOSf = require("../../Models/SOSModels/SOS");
const SOSCoursedoc = require("../../Models/CourseModels/ProgramWiseCourses");
var coursedoc = require("../../Models/CourseModels/Course");
var progs = require("../../Models/Program");

module.exports.Showall = async (req, res) => {
  try {
    console.log(req.user);
    if (!req.user) return await res.json("Timed Out");
    var backSOS = await SOS.find({})
      .populate("Page1")
      .populate({
        path: "Categories",
        populate: {
          path: "Courses",
          model: "ProgramCourses",
          populate: { path: "PreRequisites", model: "Repo" },
        },
      });
    var backs = await Promise.all(
      backSOS.map(async (a) => {
        var cats = await Promise.all(
          a.Categories.map(async (x) => {
            console.log("lats");
            var Cs = await Promise.all(
              x.Courses.map(async (i) => {
                console.log("latsasd");
                var abc = await coursedoc.findOne({ Code: i.Code });
                if (
                  abc &&
                  (i.catalogue != abc.catalogue ||
                    i.objectiveList != abc.objectiveList ||
                    i.Books != abc.Books)
                ) {
                  var objs = {
                    _id: i._id,
                    Program: i.Program,
                    Code: i.Code,
                    Name: i.Name,
                    Credit: i.Credit,
                    LectureHoursWeek: i.LectureHoursWeek,
                    LabHoursWeek: i.LabHoursWeek,
                    PreRequisites: i.PreRequisites,
                    catalogue: abc.catalogue,
                    objectiveList: abc.objectiveList,
                    Books: abc.Books,
                  };
                  var aa = await SOSCoursedoc.findByIdAndUpdate(
                    i._id,
                    objs
                  ).populate("PreRequisites");
                  return aa;
                } else {
                  return i;
                }
              })
            );
            x.Courses = Cs;
            console.log("x.Courses", x.Courses);
            return x;
          })
        );
        console.log("cats", cats);
        a.Categories = cats;
        return a;
      })
    );
    backSOS = backs;
    console.log("all SOSs", backSOS);
    await res.json(backSOS);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Showallother = async (req, res) => {
  try {
    console.log(req.user);
    if (!req.user) return await res.json("Timed Out");
    var backSOS = await SOS.find({})
      .populate("Page1")
      .populate({
        path: "Categories",
        populate: {
          path: "Courses",
          model: "ProgramCourses",
          populate: { path: "PreRequisites", model: "Repo" },
        },
      });
   
    console.log("all SOSs", backSOS);
    await res.json(backSOS);
  } catch (err) {
    console.log(err);
  }
};


module.exports.Program = async (req, res) => {
  try {
    // console.log(req.user)
    // if (!req.user) return await res.json("Timed Out");
    const backSOS = await SOSf.find({});
    console.log("all SOSs", backSOS);
    const re = backSOS.map((i) => {
      return {Program:i.Program,Year:i.Year}
    });
    console.log(re);
    await res.json(re);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ProgramHome = async (req, res) => {
  try {
    // console.log(req.user)
    // if (!req.user) return await res.json("Timed Out");
    const backSOS = await progs.find({});
    console.log("all SOSs", backSOS);
    const re = backSOS.map((i) => {
      return i.Degree+" "+i.Program;
    });
    console.log(re);
    await res.json(re);
  } catch (err) {
    console.log(err);
  }
};


module.exports.Year = async (req, res) => {
  try {
    // console.log(req.user)
    // if (!req.user) return await res.json("Timed Out");
    console.log("req.params.Program",req.params.Program)
    const backSOS = await SOSf.find({ Program: req.params.Program });
    console.log("all SOSs", backSOS);
    const ree = backSOS.filter((i) => {
      if(i.showOutside){
        return i;
      }
    });
    const re = ree.map((i) => {      
        return i.Year;      
    });
    console.log(re);
    await res.json(re);
  } catch (err) {
    console.log(err);
  }
};

module.exports.switchshowonoff = async (req, res) => {
  try {
    // console.log(req.user)
    // if (!req.user) return await res.json("Timed Out");
    console.log("req.params.Program",req.params.id)
    const backSOS = await SOSf.findById(req.params.id);    
    backSOS.showOutside=!backSOS.showOutside    
    const SS = await SOSf.findByIdAndUpdate(req.params.id,backSOS)
    console.log(SS);
    await res.json(SS);
  } catch (err) {
    console.log(err);
  }
};


module.exports.ShowOneProgramYear = async (req, res) => {
  try {
    // if (!req.user) return await res.json("Timed Out");
    const backSOS = await SOS.findOne({
      Program: req.params.Program,
      Year: req.params.Year,
    })
      .populate("Page1")
      .populate({
        path: "Categories",
        populate: {
          path: "Courses",
          model: "ProgramCourses",
          populate: { path: "PreRequisites", model: "Repo" },
        },
      });
    var cats = await Promise.all(
      backSOS.Categories.map(async (x) => {
        console.log("lats");
        var Cs = await Promise.all(
          x.Courses.map(async (i) => {
            console.log("latsasd");
            var abc = await coursedoc.findOne({ Code: i.Code });
            if (
              abc &&
              (i.catalogue != abc.catalogue ||
                i.objectiveList != abc.objectiveList ||
                i.Books != abc.Books)
            ) {
              var objs = {
                _id: i._id,
                Program: i.Program,
                Code: i.Code,
                Name: i.Name,
                Credit: i.Credit,
                LectureHoursWeek: i.LectureHoursWeek,
                LabHoursWeek: i.LabHoursWeek,
                PreRequisites: i.PreRequisites,
                catalogue: abc.catalogue,
                objectiveList: abc.objectiveList,
                Books: abc.Books,
              };
              var aa = await SOSCoursedoc.findByIdAndUpdate(
                i._id,
                objs
              ).populate("PreRequisites");
              return aa;
            } else {
              return i;
            }
          })
        );
        x.Courses = Cs;
        console.log("x.Courses", x.Courses);
        return x;
      })
    );
    console.log("cats", cats);
    backSOS.Categories = cats;
    console.log(backSOS);
    res.json(backSOS);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowOne = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const backSOS = await SOS.findOne({ _id: req.params.id })
      .populate("Page1")
      .populate({
        path: "Categories",
        populate: {
          path: "Courses",
          model: "ProgramCourses",
          populate: { path: "PreRequisites", model: "Repo" },
        },
      });
    var cats = await Promise.all(
      backSOS.Categories.map(async (x) => {
        console.log("lats");
        var Cs = await Promise.all(
          x.Courses.map(async (i) => {
            console.log("latsasd");
            var abc = await coursedoc.findOne({ Code: i.Code });
            if (
              abc &&
              (i.catalogue != abc.catalogue ||
                i.objectiveList != abc.objectiveList ||
                i.Books != abc.Books)
            ) {
              var objs = {
                _id: i._id,
                Program: i.Program,
                Code: i.Code,
                Name: i.Name,
                Credit: i.Credit,
                LectureHoursWeek: i.LectureHoursWeek,
                LabHoursWeek: i.LabHoursWeek,
                PreRequisites: i.PreRequisites,
                catalogue: abc.catalogue,
                objectiveList: abc.objectiveList,
                Books: abc.Books,
              };
              var aa = await SOSCoursedoc.findByIdAndUpdate(
                i._id,
                objs
              ).populate("PreRequisites");
              return aa;
            } else {
              return i;
            }
          })
        );
        x.Courses = Cs;
        console.log("x.Courses", x.Courses);
        return x;
      })
    );
    console.log("cats", cats);
    backSOS.Categories = cats;
    console.log(backSOS);
    res.json(backSOS);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Delete = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const backSOS = await SOS.deleteOne({ _id: req.params.id });
    console.log("SOS", backSOS);
    await res.json(backSOS);
  } catch (err) {
    console.log(err);
  }
};
