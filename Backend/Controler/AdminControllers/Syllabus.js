var Syllabusdoc = require("../../Models/SyallabusModels/Syllabus");
var coursedoc = require("../../Models/CourseModels/ProgramWiseCourses");
var Syllabusgendoc = require("../../Models/SyallabusModels/SyllabusGeneral");
var coursedocgen = require("../../Models/CourseModels/ProgramWiseCourses");

module.exports.Showallgen = async (req, res) => {
  try {
    console.log(req.user)
    if (!req.user) return await res.json("Timed Out");
    const Syllabus = await Syllabusgendoc.find({});
    const course = await coursedocgen.find({}); 
    const Syllabusf = Syllabus.map(i=>{
        const coursefilt = course.find(e=>{
            if(e.Code==i.Code){
              console.log("here")
              const nam=e.Name
              return(nam)
                
            }
          })
          console.log(coursefilt.Name)

          i.Name=coursefilt.Name
          
          console.log(i)

          return({_id:i._id,Code:i.Code,Name:coursefilt.Name,Plan:i.Plan})
    })
    console.log("all Syllabuss", Syllabusf);
    await res.json(Syllabusf);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowOnegen = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const Syllabus = await Syllabusgendoc.findById(req.params.id)
    console.log(Syllabus)
    await res.json(Syllabus);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Showall = async (req, res) => {
  try {
    console.log(req.user)
    if (!req.user) return await res.json("Timed Out");
    const Syllabus = await Syllabusdoc.find({});
    const course = await coursedoc.find({}); 
    const Syllabusf = Syllabus.map(i=>{
        const coursefilt = course.find(e=>{
            if(e.Code==i.Code){
              console.log("here")
              const nam=e.Name
              return(nam)
                
            }
          })
          console.log(coursefilt.Name)

          i.Name=coursefilt.Name
          
          console.log(i)

          return({_id:i._id,Program:i.Program,Code:i.Code,Name:coursefilt.Name,Plan:i.Plan})
    })
    console.log("all Syllabuss", Syllabusf);
    await res.json(Syllabusf);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Shower = async (req, res) => {
  try {
    console.log(req.user)
    if (!req.user) return await res.json("Timed Out");
    const Syllabus = await Syllabusgendoc.findOne({Code:req.params.Code})
    console.log("gen Syllabuss",Syllabus);
    await res.json(Syllabus);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowbyProgramandCode = async (req, res) => {
  try {
    console.log(req.user)
    if (!req.user) return await res.json("Timed Out");
    const Syllabus = await Syllabusgendoc.findOne({Program:req.params.Program,Code:req.params.Code})
    console.log("gen Syllabuss",Syllabus);
    await res.json(Syllabus);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowOne = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const Syllabus = await Syllabusdoc.findById(req.params.id)
    console.log(Syllabus)
    await res.json(Syllabus);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Delete = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const Syllabus = await Syllabusdoc.deleteOne({ _id: req.params.id });
    console.log("all Syllabuss", Syllabus);
    await res.json(Syllabus);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Update = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const Syllabus = await Syllabusdoc.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    )
    console.log("all Syllabuss", Syllabus);
    await res.json(Syllabus);
  } catch (err) {
    console.log(err);
  }
};
