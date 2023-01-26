var coursedoc = require("../../Models/CourseModels/Course");
var coursedoc2 = require("../../Models/CourseModels/SOSCourse");
var CDF2 = require("../../Models/CDFModels/CDFGeneral");

module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const precourses = await coursedoc.findOne({Code:req.body.Code});
    const precourse = await coursedoc.findOne({Name:req.body.Name});
    if(precourses)return await res.json("Already Exists Code");
    if(precourse)return await res.json("Already Exists Name");
    const course = await coursedoc.create(req.body);
    console.log("course added", course);
    await res.json(course);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Showall = async (req, res) => {
  try {
    console.log(req.user)
    if (!req.user) return await res.json("Timed Out");
    const course = await coursedoc.find({});
    console.log("all courses", course);
    await res.json(course);
  } catch (err) {
    console.log(err);
  }
};
module.exports.ViewOnebyCode = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const course = await coursedoc.findOne({Code:req.params.Code}).populate('PreRequisites')
    console.log(course)
    res.json(course);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowOne = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const course = await coursedoc.findById(req.params.id).populate('PreRequisites');
    console.log(course)
    res.json(course);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowAuthors = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const course = await coursedoc2.findOne({Code:req.params.Code}).populate('PreRequisites');
    console.log("course",course)
    console.log("course.Books",course.Books)
    var arr = course.Books.map((e) => {
      var aa = e.BookWriter.split(",")
      console.log("Aa",aa)
      var ab = aa[0].split(".")
      console.log("ab",ab)
      var te =""
      if(ab.lenght>1){
        te = ab.reduce((a,b)=>{
          return a.length>b.length ? a : b
        })
      }
      else{
        te=ab[0]
      }
      console.log("te", te)
      return te
    });
    console.log("arr",arr)
    res.json(arr);
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
module.exports.Update = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const course = await coursedoc.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    console.log("all courses", course);
    await res.json(course);
  } catch (err) {
    console.log(err);
  }
};
