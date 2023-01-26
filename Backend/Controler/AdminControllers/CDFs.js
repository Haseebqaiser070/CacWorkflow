var CDFdoc = require("../../Models/CDFModels/CDF");
var coursedoc = require("../../Models/CourseModels/ProgramWiseCourses");
var coursedocgen = require("../../Models/CourseModels/Course");
var CDFgendoc = require("../../Models/CDFModels/CDFGeneral");
var BTL = require("../../Models/SOBTL/BTL");

module.exports.ShowOnegen = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const CDF = await CDFgendoc.findById(req.params.id)
      .populate({ path: "CLOs", populate: { path: "BTL", model: "BTL" } })
      .populate({ path: "CLOs", populate: { path: "So", model: "SOO" } });
    console.log(CDF);
    await res.json(CDF);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Showall = async (req, res) => {
  try {
    console.log(req.user);
    if (!req.user) return await res.json("Timed Out");
    const CDF = await CDFdoc.find({});
    const course = await coursedoc.find({});
    const CDFf = CDF.map((i) => {
      const coursefilt = course.find((e) => {
        if (e.Code == i.Code) {
          console.log("here");
          const nam = e.Name;
          return nam;
        }
      });
      console.log("\nnames", coursefilt.Name);
      i.Name = coursefilt.Name;
      return {
        _id: i._id,
        Program: i.Program,
        Code: i.Code,
        Name: coursefilt.Name,
        Topics: i.Topics,
        CLOs: i.CLOs,
        textBook: i.textBook,
        referenceBook: i.referenceBook,
      };
    });
    console.log("all CDFs", CDFf);
    await res.json(CDFf);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Showallgen = async (req, res) => {
  try {
    console.log(req.user);
    if (!req.user) return await res.json("Timed Out");
    const CDF = await CDFgendoc.find({});
    const course = await coursedocgen.find({});
    const CDFf = CDF.map((i) => {
      const coursefilt = course.find((e) => {
        if (e.Code == i.Code) {
          console.log("here");
          const nam = e.Name;
          return nam;
        }
      });
      console.log("\nnames", coursefilt.Name);
      i.Name = coursefilt.Name;
      return {
        _id: i._id,
        Program: i.Program,
        Code: i.Code,
        Name: coursefilt.Name,
        Topics: i.Topics,
        CLOs: i.CLOs,
        textBook: i.textBook,
        referenceBook: i.referenceBook,
      };
    });
    console.log("all CDFs", CDFf);
    await res.json(CDFf);
  } catch (err) {
    console.log(err);
  }
};


module.exports.Shower = async (req, res) => {
  try {
    console.log(req.user);
    if (!req.user) return await res.json("Timed Out");
    const CDF = await CDFgendoc.findOne({ Code: req.params.Code })
      .populate({ path: "CLOs", populate: { path: "BTL", model: "BTL" } })
      .populate({ path: "CLOs", populate: { path: "So", model: "SOO" } });
    console.log("gen CDFs", CDF);
    await res.json(CDF);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowerOne = async (req, res) => {
  try {
    console.log(req.user);
    if (!req.user) return await res.json("Timed Out");
    const CDF = await CDFdoc.findOne({
      Program: req.params.Program,
      Code: req.params.Code,
    })
      .populate({ path: "CLOs", populate: { path: "BTL", model: "BTL" } })
      .populate({ path: "CLOs", populate: { path: "So", model: "SOO" } });
    console.log("gen CDFs", CDF);
    await res.json(CDF);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowOne = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const CDF = await CDFdoc.findById(req.params.id)
      .populate({ path: "CLOs", populate: { path: "BTL", model: "BTL" } })
      .populate({ path: "CLOs", populate: { path: "So", model: "SOO" } });
    console.log(CDF);
    await res.json(CDF);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Delete = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const CDF = await CDFdoc.deleteOne({ _id: req.params.id });
    console.log("all CDFs", CDF);
    await res.json(CDF);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Update = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const CDF = await CDFdoc.findOneAndUpdate({ _id: req.params.id }, req.body)
      .populate({ path: "CLOs", populate: { path: "BTL", model: "BTL" } })
      .populate({ path: "CLOs", populate: { path: "So", model: "SOO" } });
    console.log("all CDFs", CDF);
    await res.json(CDF);
  } catch (err) {
    console.log(err);
  }
};
