const Repo = require("../../../Models/RepoCourse");
const Userdoc = require("../../../Models/User");
const Versionodoc=require("../../../Models/CourseModels/CourseVersion")
const Task = require("../../../Models/Tasks");
const ReturnCourse = require("../../../Models/CourseModels/ReturnCourse");
const Mail = require("../../../helpers/mailing");

module.exports.showUsers = async (req, res) => {
    try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const user = await Userdoc.findById(req.user._id).populate("CourseCreation");
    console.log("CourseCreation",user.CourseCreation)
    await res.status(200).json(user.CourseCreation)
    } catch (err) {
      console.log(err);
      await res.status(400).json("error")

    }
  };
  module.exports.Submit = async (req, res) => {
    try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const user = await Userdoc.findById(req.user._id).populate('CourseCreation');
    var rm
    const newCSDF =  user.CourseCreation.filter((x)=>{
      if(x.Code!=req.params.Code){
         return x._id
        }
      else{
        rm=x._id
      }
    })
    var arr2 = ["Create Catalog Description","Update Catalog Description"]
    var task  = await Task.findOne({taskType:{$in:arr2},User:req.user._id,Course:rm}).populate("User")
    .populate({path:"User",Model:"User", populate:{path:"CourseCreation",model:"Repo"}})
    
    const date=new Date(Date.now())
    const date2=new Date(task.Deadline)
    if(date2<date){return await res.status(401).json("Deadline Passed")}
    
    const Version = await Versionodoc.find({Code:req.params.Code},{_id:0})
    if(Version.length<1){return await res.status(404).json("No Versions")}
    const obj =  Version[Version.length - 1]
    console.log("\n\n\n\n\n\n\n\n obj",obj)
    
    task.Status = "Returned"
    console.log("\n\n\n\n\n\n\n\n",task,"\n\n\n\n\n\n\n\n")
    const newtask = await Task.findByIdAndUpdate(task._id,task)
    console.log("\n\n\n\n\n\n\n\n",newtask,"\n\n\n\n\n\n\n\n")
        
    await Promise.all(task.User.map(async(i)=>{
      const newCourseCreation =  i.CourseCreation.filter((x)=>{
        if(x.Code!=req.params.Code) return x._id
      })
      const newuser =  await Userdoc.findByIdAndUpdate(i._id,{CourseCreation:newCourseCreation})   
      console.log("\n\n\n\n\n\n\n\n newUser",newuser)           
    }))
    // console.log("\n\n\n\n\n\n\n\n CourseCreation",user.CourseCreation)  
    // user.CourseCreation = newCourseCreation
    // console.log("\n\n\n\n\n\n\n\n newCourseCreation",newCourseCreation)
    // const newuser =  await Userdoc.findByIdAndUpdate(user._id,user)
    // console.log("\n\n\n\n\n\n\n\n newUser",newuser)
    const resss=await Userdoc.find({})
    console.log("ds",resss)     
    //error is here
    const retrn = await ReturnCourse.create( {Code: obj.Code,
    Name: obj.Name,
    Credit: obj.Credit,
    LectureHoursWeek: obj.LectureHoursWeek ,
    LabHoursWeek:obj.LabHoursWeek,
    catalogue: obj.catalogue,
    objectiveList:obj.objectiveList ,
    Books:obj.Books
  })
    console.log("returned \n\n\n\n\n",retrn)
    Mail.TaskReturned(task,user.Email)

    await res.status(200).json("submitted")
    } catch (err) {
      console.log("\n\nerr in submit",err);
      await res.status(400).json("error")
    }
  };
