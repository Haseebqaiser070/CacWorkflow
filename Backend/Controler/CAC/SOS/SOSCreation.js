const Userdoc = require("../../../Models/User");
const Versionodoc=require("../../../Models/SOSModels/SOSVersions")
const Task = require("../../../Models/Tasks");
const Returned = require("../../../Models/SOSModels/ReturnSOS");
const SOS = require("../../../Models/SOSModels/SOS");
const Mail = require("../../../helpers/mailing");

module.exports.showUsers = async (req, res) => {
    try {
    if (!req.user) return await res.status(401).json("Timed Osut");
    const user = await Userdoc.findById(req.user._id);
     console.log("SOS",user)
    await res.status(200).json(user.SOSCreation)
    } catch (err) {
      console.log(err);
      await res.status(400).json("error")

    }
  };
  module.exports.Submit = async (req, res) => {
    try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const user = await Userdoc.findById(req.user._id)
    var arr2 = ["Create SOS","Update SOS"]
    const task  = await Task.findOne({taskType:{$in:arr2},User:req.user._id,Program:req.params.Program,Course:null}).populate("User")
    
    const date=new Date(Date.now())
    const date2=new Date(task.Deadline)
    if(date2<date){return await res.status(401).json("Deadline Passed")}
    
    
    const Version = await Versionodoc.find({Program:req.params.Program},{_id:0})
    if(Version.length<1)return await res.status(404).json("No Versions")
    const obj = Version[Version.length - 1]
    console.log("\n\n\n\n\n\n\n\n obj",obj)
    
    const already  = await SOS.findOne({Program:obj.Program,Year:obj.Year})
    if(already&&task.taskType=="Create SOS"){return await res.status(401).json("SOS of this program for this year has already been made")}
    
    task.Status = "Returned"
    console.log("\n\n\n\n\n\n\n\n",task,"\n\n\n\n\n\n\n\n")
    const newtask  = await Task.findByIdAndUpdate(task._id,task)
    console.log("\n\n\n\n\n\n\n\n",newtask,"\n\n\n\n\n\n\n\n")

    await Promise.all(task.User.map(async(i)=>{
      var newSOSCreation = []
      i.SOSCreation.map((x)=>{
        if(x.Program!=req.params.Program){newSOSCreation.push(x)}
      })
      const newuser =  await Userdoc.findByIdAndUpdate(i._id,{SOSCreation:newSOSCreation})   
      console.log("\n\n\n\n\n\n\n\n newUser",newuser)           
    }))
    //error is here
    const retrn = await Returned.create({Page1:obj.Page1,Program:obj.Program,Year:obj.Year,Categories:obj.Categories})
    console.log("returned \n\n\n\n\n",retrn)
  
    const resss=await Userdoc.find({})
    console.log("ds",resss)
    
        Mail.TaskReturned(task,user.Email)
     
    await res.status(200).json("submitted")
    } catch (err) {
      console.log(err);
      await res.status(400).json("error")
    }
  };
