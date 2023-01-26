var coursedoc = require("../../Models/CourseModels/Course");
var facultydoc = require("../../Models/Faculty");
var bcrypt = require("bcrypt");
var deadlineTheory= require("../../Models/deadlineTheory");
var deadlineLab= require("../../Models/deadlineLab");
var User=require("../../Models/User")
var Mail=require("../../helpers/mailing")
module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const { FirstName, SecondName, Email, Password, Allocated, Role, Degree } =
      req.body;
    const cor = await coursedoc.findOne({ Allocated });
    if (!cor) return res.status("400").json("no course");
    newPassword = await bcrypt.hash(Password, 12);
    const faculty = await facultydoc.create({
      FirstName,
      SecondName,
      Email,
      Password: newPassword,
      Course: cor._id,
      Role,
    });
    console.log("faculty added", faculty);
    await res.json(faculty);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Showall = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    console.log("insiede");
    const faculty = await facultydoc.find({}).populate("Course");
    console.log("all faculty", faculty);
    await res.json(faculty);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Delete = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const faculty = await facultydoc.deleteOne({ _id: req.params.id });
    console.log("all faulty", faculty);
    await res.json(faculty);
  } catch (err) {
    console.log(err);
  }
};

module.exports.TheoryReq = async (req, res) => {
  try {
    
    console.log("hell23e34o")
    if (!req.user) return await res.status(401).json("Timed Out");
    const aa = await deadlineTheory.create({Request_id:req.params.id,Round:req.body.Round,Deadline:req.body.Deadline,Type:req.body.Type,pending:true,DeadlineDate:req.body.DeadlineDate});
    console.log("aa", aa);
    const user=await User.find({})
    const admin=await User.findById({_id:req.params.id})
    user.map((item)=>{
      item.Roles.map((i)=>{
        if(i=="Admin"){
          Mail.DeadlineExtended(item.Email,req.body.Type,req.body.Round,admin.Name)

        }
      })
    })
    await res.status(200).json(aa);
  } catch (err) {
    console.log(err);
  }
};

module.exports.LabReq = async (req, res) => {
  try {
    console.log("hell23e34o")
    if (!req.user) return await res.status(401).json("Timed Out");
    const aa = await deadlineLab.create({Request_id:req.params.id,Round:req.body.Round,Deadline:req.body.Deadline,Type:req.body.Type,pending:true,DeadlineDate:req.body.DeadlineDate});
    console.log("aa", aa);
    const user=await User.find({})
    const admin=await User.findById({_id:req.params.id})
    user.map((item)=>{
      item.Roles.map((i)=>{
        if(i=="Admin"){
          Mail.DeadlineExtended(item.Email,req.body.Type,req.body.Round,admin.Name)

        }
      })
    })
    await res.status(200).json(aa);
  } catch (err) {
    console.log(err);
  }
};

/*
module.exports.ShowOne = async (req, res) => {
  try {
    const course = await coursedoc.findById(req.params.id);
    res.json(course);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Update = async (req, res) => {
  try {
    if(!req.user.isAdmin||!req.user)return await res.json("Timed Out")
    const course = await coursedoc.findOneAndUpdate({ _id: req.params.id },req.body);
    console.log("all courses", course);
    await res.json(course);
  } catch (err) {
    console.log(err);
  }
};*/
