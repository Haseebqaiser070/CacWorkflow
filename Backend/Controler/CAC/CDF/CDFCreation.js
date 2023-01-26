const Repo = require("../../../Models/RepoCourse");
const Userdoc = require("../../../Models/User");
const Versionodoc=require("../../../Models/CDFModels/CDFVersions")
const Task = require("../../../Models/Tasks");
const ReturnCourse = require("../../../Models/CDFModels/ReturnCDF");
const Mail = require("../../../helpers/mailing");

module.exports.showUsers = async (req, res) => {
    try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const user = await Userdoc.findById(req.user._id).populate("CourseCDF");
     console.log("CourseCDF",user)
    await res.status(200).json(user.CourseCDF)
    } catch (err) {
      console.log(err);
      await res.status(400).json("error")

    }
  };
  module.exports.Submit = async (req, res) => {
    try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const user = await Userdoc.findById(req.user._id).populate('CourseCDF');

    var rm
    const newCourseCreation =  user.CourseCDF.filter((x)=>{
      if(x.Code!=req.params.Code){
         return x._id
        }
      else{
        rm=x._id
      }
    })
    var arr2 = ["Create CDF","Update CDF"]
    const task  = await Task.findOne({taskType:{$in:arr2},User:req.user._id,Course:rm}).populate("User")
    .populate({path:"User",Model:"User", populate:{path:"CourseCDF",model:"Repo"}})
    console.log("\n task",task)
    const date=new Date(Date.now())
    const date2=new Date(task.Deadline)
    if(date2<date){return await res.status(401).json("Deadline Passed")}

    const Version = await Versionodoc.find({Code:req.params.Code},{_id:0})
    if(Version.length<1){return await res.status(404).json("No Versions")}
    console.log("\n Version",Version)
    const obj = await Version[Version.length - 1]
    
    console.log("\n obj",obj)
    
    task.Status = "Returned"
    const newtask  = await Task.findByIdAndUpdate(task._id,task)
    
    await Promise.all(task.User.map(async(i)=>{
      const newCourseCDF =  i.CourseCDF.filter((x)=>{
        if(x.Code!=req.params.Code) return x._id
      })    
      const newuser =  await Userdoc.findByIdAndUpdate(i._id,{CourseCDF:newCourseCDF})   
      console.log("\n\n\n\n\n\n\n\n newUser",newuser)           
    }))
    
    console.log("\n\n\n\n\n\n\n\n",newtask,"\n\n\n\n\n\n\n\n")
    const resss=await Userdoc.find({})
    console.log("ds",resss)
    
        
    // user.CourseCDF = newCourseCDF
    // console.log("\n\n\n\n\n\n\n\n newCourseCDF",newCourseCDF)
    // const newuser =  await Userdoc.findByIdAndUpdate(user._id,user)
    // console.log("\n\n\n\n\n\n\n\n newUser",newuser)

    //error is here
    const retrn = await ReturnCourse.create( {
    Code: obj.Code,  
    Topics: obj.Topics,
    CLOs: obj.CLOs,
    textBook: obj.textBook,
    referenceBook: obj.referenceBook,
  })
    Mail.TaskReturned(task,user.Email)
      
    
    console.log("returned \n\n\n\n\n",retrn)
  
    await res.status(200).json("submitted")
    } catch (err) {
      console.log(err);
      await res.status(400).json("error")
    }
  };
