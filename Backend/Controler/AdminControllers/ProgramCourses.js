var coursedoc = require("../../Models/CourseModels/ProgramWiseCourses");
var CDFdoc = require("../../Models/CDFModels/CDF");


module.exports.Showall = async (req, res) => {
  try {
    console.log(req.user);
    if (!req.user) return await res.json("Timed Out");
    const course = await coursedoc.find({ Program: req.params.Program });
    console.log("all courses", course);
    await res.json(course);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Showallithprograms = async (req, res) => {
  try {
    console.log(req.user);
    if (!req.user) return await res.json("Timed Out");
    const course = await coursedoc.find({});
    console.log("all courses", course);
    await res.json(course);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowallwithCDF = async (req, res) => {
  try {
    console.log(req.user);
    if (!req.user) return await res.json("Timed Out");
    const course = await coursedoc.find({ Program: req.params.Program });
    var rets = [];
    await Promise.all(
      course.map(async (i) => {
        var cdf = await CDFdoc.findOne({
          Program: req.params.Program,
          Code: i.Code,
        });
        if(cdf) rets.push(i);
      })
    );
    console.log("all courses", rets);
    await res.json(rets);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowOne = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const course = await coursedoc
      .findById(req.params.id)
      .populate("PreRequisites");
    console.log(course);
    await res.json(course);
  } catch (err) {
    console.log(err);
  }
};
module.exports.ShowOneCode = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const course = await coursedoc
      .findOne({ Program: req.params.Program, Code: req.params.Code })
      .populate("PreRequisites");
    console.log(course);
    await res.json(course);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Delete = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const course = await coursedoc.deleteOne({ _id: req.params.id });
    console.log("all courses", course);
    await res.json(course);
  } catch (err) {
    console.log(err);
  }
};
