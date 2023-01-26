const Repo = require("../../../Models/RepoCourse");
const Userdoc = require("../../../Models/User");
const Versionodoc=require("../../../Models/SyallabusModels/SyllabusVersion")
const Task = require("../../../Models/Tasks");
const ReturnSyllabus = require("../../../Models/SyallabusModels/ReturnSyllabus");
const Mail = require("../../../helpers/mailing");

module.exports.showUsers = async (req, res) => {
    try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const user = await Userdoc.findById(req.user._id).populate("CourseSyllabus");;
    console.log(user.CourseSyllabus)
    await res.status(200).json(user.CourseSyllabus)
    } catch (err) {
      console.log(err);
      await res.status(400).json("error")

    }
  };

  module.exports.Submit = async (req, res) => {
    try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const user = await Userdoc.findById(req.user._id).populate('CourseSyllabus');
    const arr = user.CourseSyllabus.filter((i)=>{
        if(i.Code==req.params.Code)return i
      })
      
    var arr2 = ["Create Syllabus","Update Syllabus"]
    
    const task  = await Task.findOne({taskType:{$in:arr2},User:req.user._id,Course:{$in:arr}}).populate("User")
    .populate({path:"User",Model:"User", populate:{path:"CourseSyllabus",model:"Repo"}})

    const date=new Date(Date.now())
    const date2=new Date(task.Deadline)
    if(date2<date){return await res.status(401).json("Deadline Passed")}

    const Version = await Versionodoc.find({Code:req.params.Code},{_id:0})
    if(Version.length<1)return await res.status(404).json("No Versions")
    const obj = await Version[Version.length - 1]
    console.log("\n\n\n\n\n\n\n\n obj",obj)


    task.Status = "Returned"

    console.log("\n\n\n\n\n\n\n\n",task,"\n\n\n\n\n\n\n\n")
    const newtask  = await Task.findByIdAndUpdate(task._id,task)
    console.log("\n\n\n\n\n\n\n\n",newtask,"\n\n\n\n\n\n\n\n")
    await Promise.all(task.User.map(async(i)=>{
      const newCourseSyllabus =  i.CourseSyllabus.filter((x)=>{
        if(x.Code!=req.params.Code) return x._id
      })      
      const newuser =  await Userdoc.findByIdAndUpdate(i._id,{CourseSyllabus:newCourseSyllabus})   
      console.log("\n\n\n\n\n\n\n\n newUser",newuser)           
    }))
    const resss=await Userdoc.find({})
    console.log("ds",resss)
    
        Mail.TaskReturned(task,user.Email)
      
    //error is here
    const retrn = await ReturnSyllabus.create( {
    Code: obj.Code,  
    Plan: obj.Plan
  })
    console.log("returned \n\n\n\n\n",retrn)
  
    await res.status(200).json("submitted")
    } catch (err) {
      console.log(err);
      await res.status(400).json("error")
    }
  };
