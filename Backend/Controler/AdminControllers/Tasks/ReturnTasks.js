const Task = require("../../../Models/Tasks");
const coursedoc = require("../../../Models/CourseModels/Course");
const ReturnCourse = require("../../../Models/CourseModels/ReturnCourse");
const VersionCourse=require("../../../Models/CourseModels/CourseVersion")
const ReturnedSOS = require("../../../Models/SOSModels/ReturnSOS");
const VersionSOS=require("../../../Models/SOSModels/SOSVersions")
const SOSdoc=require("../../../Models/SOSModels/SOS")
const ProgramCourses=require("../../../Models/CourseModels/ProgramWiseCourses")
const SOSCourse=require("../../../Models/CourseModels/SOSCourse")
const ReturnedCDF = require("../../../Models/CDFModels/ReturnCDF");
const CDFdoc = require("../../../Models/CDFModels/CDF");
const VaersionCDF = require("../../../Models/CDFModels/CDFVersions");
const genCDF = require("../../../Models/CDFModels/CDFGeneral");
const ReturnedSyllabus = require("../../../Models/SyallabusModels/ReturnSyllabus");
const Syllabusdoc = require("../../../Models/SyallabusModels/Syllabus");
const VaersionSyllabus = require("../../../Models/SyallabusModels/SyllabusVersion");
const genSyllabus = require("../../../Models/SyallabusModels/SyllabusGeneral");
const Userdoc = require("../../../Models/User");
var SOSPage1 = require("../../../Models/SOSModels/SOSFirstPage");
const Mail=require("../../../helpers/mailing")
module.exports.Showall = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");
      const task = await Task.find({Status:req.params.status}).populate("User").populate("Course");     
      console.log(task)
      await res.status(200).json(task);
    } catch (err) {
        res.status(400).json("error");
        console.log(err);
    }
  };
    
module.exports.Lock = async (req, res) => {
    try {
      
      if (!req.user) return await res.status(401).json("Timed Out");
      if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");
      const task = await Task.findById(req.params.id).populate("Course");
      
      task.User?.map((item)=>{
        var taskk=task
        taskk.Status = "Finished"
        Userdoc.findById({_id:item}).then(
          (res)=>{
            Mail.TaskLock(taskk,res.Email)
          }) 
        
      })
      if(task.taskType=="Create Catalog Description"||task.taskType=="Update Catalog Description"){
        const obj = await ReturnCourse.findOne({Code:task.Course.Code},{_id:0})
        console.log(obj)
        var finalcourse
        if(task.taskType=="Create Catalog Description"){
          const SOS = await SOSdoc.find({})        
          finalcourse = await coursedoc.create({
          Code: obj.Code,
          Name: obj.Name,
          Credit: obj.Credit,
          LectureHoursWeek: obj.LectureHoursWeek ,
          LabHoursWeek:obj.LabHoursWeek,
          Category:obj.Category,
          PreRequisites:obj.PreRequisites,
          catalogue: obj.catalogue,
          objectiveList:obj.objectiveList ,
          Books:obj.Books
        });
        await Promise.all(SOS.map(async(i)=>{
          const pcors = await ProgramCourses.findOne({Program:i.Program,Code:obj.Code})            
          if(pcors){
            const CDF = await ProgramCourses.findOneAndUpdate({Code: obj.Code,Program:i.Program},{
              Code: obj.Code,
              Name: obj.Name,
              Credit: obj.Credit,
              LectureHoursWeek: obj.LectureHoursWeek ,
              LabHoursWeek:obj.LabHoursWeek,
              Category:obj.Category,
              PreRequisites:obj.PreRequisites,
              catalogue: obj.catalogue,
              objectiveList:obj.objectiveList ,
              Books:obj.Books
            })
              console.log("finalCDF",CDF)}
              }
            ))      
      }
        else if(task.taskType=="Update Catalog Description"){
          finalcourse = await coursedoc.findOneAndUpdate({Code:obj.Code},{
            Code: obj.Code,
            Name: obj.Name,
            Credit: obj.Credit,
            LectureHoursWeek: obj.LectureHoursWeek ,
            LabHoursWeek:obj.LabHoursWeek,
            Category:obj.Category,
            catalogue: obj.catalogue,
            objectiveList:obj.objectiveList ,
            Books:obj.Books
         });
         
         const SOS = await SOSdoc.find({})
        

          await Promise.all(SOS.map(async(i)=>{
          const pcors = await ProgramCourses.findOne({Program:i.Program,Code:obj.Code})            
          if(pcors){
            const CDF = await ProgramCourses.findOneAndUpdate({Code: obj.Code,Program:i.Program},{
              Code: obj.Code,
              Name: obj.Name,
              Credit: obj.Credit,
              LectureHoursWeek: obj.LectureHoursWeek ,
              LabHoursWeek:obj.LabHoursWeek,
              Category:obj.Category,
              catalogue: obj.catalogue,
              objectiveList:obj.objectiveList ,
              Books:obj.Books
            })
              console.log("finalCDF",CDF)}
              }
            ))     
      }
        const a = await ReturnCourse.deleteOne({Code:task.Course.Code})                   
        console.log(a)       
        const b = await Task.findByIdAndUpdate(task._id,task)
        console.log(b)
        const c = await VersionCourse.deleteMany({Code:task.Course.Code})
        console.log(c)
        await res.status(200).json("lOCKED");
        
    }
        
      
      else if(task.taskType=="Create SOS"||task.taskType=="Update SOS"){
        console.log("Task",task)
        const obj = await ReturnedSOS.findOne({Program:task.Program}).populate({path:"Categories"
        ,populate:{path:"Courses",model:"SOSCourse",
        populate:{path:'PreRequisites',model:'Repo'}}});
        console.log("obj",obj)
        
       var finalSOS
        if(task.taskType=="Create SOS"){
          const cats = await Promise.all(obj.Categories.map(async(e) => {
            const cors = await Promise.all(e.Courses.map(async(i) => {
                delete i._id
                console.log("i",i)
                const doc = await ProgramCourses.create({          
                  Program: i.Program,
                  Code: i.Code,
                  Name: i.Name,
                  Credit: i.Credit,
                  LectureHoursWeek: i.LectureHoursWeek ,
                  LabHoursWeek:i.LabHoursWeek,
                  PreRequisites:i.PreRequisites,
                  catalogue:i.catalogue,
                  objectiveList:i.objectiveList,
                  Books:i.Books
                  })   
                return await doc          
             })
             )
             console.log("cors",cors)
             e.Courses = cors
             return await e
         }))
         obj.Categories=cats
       
         const p1 = await SOSPage1.find({Program:obj.Program,Year:obj.Year})
         await Promise.all(p1.map(async(i) => {
          console.log("i",i)
          console.log("ob",obj.Page1)
          console.log(!obj.Page1.equals(i._id))
          if(!obj.Page1.equals(i._id)){
            console.log("condi")
          
            var doc = await SOSPage1.deleteOne({_id:i._id})
            console.log("delete",doc)
            }
          })
          )
  
          finalSOS = await SOSdoc.create({Page1:obj.Page1,Program:obj.Program,Year:obj.Year,Categories:obj.Categories});
        console.log("finalSOS",finalSOS)
        }
        else if(task.taskType=="Update SOS"){
          if(obj.Program!=null){
          const SOScc = await SOSdoc.findOne({Program:obj.Program,Year:obj.Year})
          await Promise.all(SOScc.Categories.map(async(e) => {
            const cors = await Promise.all(e.Courses.map(async(i) => {
                
                var doc = await ProgramCourses.deleteOne({_id:i._id})  
                return  doc          
             })
             )
             console.log("cors",cors)
             return await e
         }))
        }
          
          const cats = await Promise.all(obj.Categories.map(async(e) => {
            const cors = await Promise.all(e.Courses.map(async(i) => {
                delete i._id
                console.log("i",i)
                const doc = await ProgramCourses.create({          
                  Program: i.Program,
                  Code: i.Code,
                  Name: i.Name,
                  Credit: i.Credit,
                  LectureHoursWeek: i.LectureHoursWeek ,
                  LabHoursWeek:i.LabHoursWeek,
                  PreRequisites:i.PreRequisites,
                  catalogue:i.catalogue,
                  objectiveList:i.objectiveList,
                  Books:i.Books
                  })   
                return await doc          
             })
             )
             console.log("cors",cors)
             e.Courses = cors
             return await e
         }))
         obj.Categories=cats
       
         const p1 = await SOSPage1.find({Program:obj.Program,Year:obj.Year})
         await Promise.all(p1.map(async(i) => {
          console.log("i",i)
          console.log("ob",obj.Page1)
          console.log(!obj.Page1.equals(i._id))
          if(!obj.Page1.equals(i._id)){
            console.log("condi")          
            var doc = await SOSPage1.deleteOne({_id:i._id})
            console.log("delete",doc)
            }
          })
          )
         console.log("cats",cats)
  
          finalSOS = await SOSdoc.findOneAndUpdate({Program:obj.Program,Year:obj.Year},
            {Page1:obj.Page1,Program:obj.Program,Year:obj.Year,Categories:obj.Categories});
        console.log("finalSOS",finalSOS)
        }        
        
        task.Status = "Finished"
        console.log("finalTask",task)        
        await ReturnedSOS.deleteOne({Program:task.Program})
        await Task.findByIdAndUpdate(task._id,task)
        await VersionSOS.deleteMany({Program:task.Program})
        await SOSCourse.deleteMany({Program:task.Program})
        
        await res.status(200).json("finalSOS");
      }
      
      else if(task.taskType=="Create CDF"||task.taskType=="Update CDF"){
        const obj = await ReturnedCDF.findOne({Code:task.Course.Code},{_id:0})
        console.log(obj)
        const SOS = await SOSdoc.find({})
        if(task.taskType=="Create CDF"){
          await genCDF.create({
            Code: obj.Code,
            Topics: obj.Topics,
            CLOs: obj.CLOs,
            textBook: obj.textBook ,
            referenceBook:obj.referenceBook
            })
          await Promise.all(SOS.map(async(i)=>{
            const pcors = await ProgramCourses.findOne({Program:i.Program,Code:obj.Code})            
            const pCDF = await CDFdoc.findOne({Program:i.Program,Code:obj.Code})

            if(pcors&&!pCDF){
            const CDF = await CDFdoc.create({
              Program:i.Program,
              Code: obj.Code,
              Topics: obj.Topics,
              CLOs: obj.CLOs,
              textBook: obj.textBook ,
              referenceBook:obj.referenceBook
              })
              console.log("finalCDF",CDF)}
              }
            ))
          }
        else if(task.taskType=="Update CDF"){
          await genCDF.findOneAndUpdate({Code: obj.Code},{
            Code: obj.Code,
            Topics: obj.Topics,
            CLOs: obj.CLOs,
            textBook: obj.textBook ,
            referenceBook:obj.referenceBook
            })
            await Promise.all(SOS.map(async(i)=>{
            const pcors = await ProgramCourses.findOne({Program:i.Program,Code:obj.Code})            
            const pCDF = await CDFdoc.findOne({Program:i.Program,Code:obj.Code})

            if(pcors&&pCDF){
              const CDF = await CDFdoc.findOneAndUpdate({Code: obj.Code,Program:i.Program},{
                Program:i.Program,
                Code: obj.Code,
                Topics: obj.Topics,
                CLOs: obj.CLOs,
                textBook: obj.textBook ,
                referenceBook:obj.referenceBook
                })
                console.log("finalCDF",CDF)}
                }
              ))
        
        }
        task.Status = "Finished"
        await ReturnedCDF.deleteOne({Code:task.Course.Code})        
        await Task.findByIdAndUpdate(task._id,task)
        await VaersionCDF.deleteMany({Code:task.Course.Code})
        res.status(200).json("genCDF");
      }

      else if(task.taskType=="Create Syllabus"||task.taskType=="Update Syllabus"){
        const obj = await ReturnedSyllabus.findOne({Code:task.Course.Code},{_id:0})
        console.log(obj)
        const SOS = await SOSdoc.find({})
        if(task.taskType=="Create Syllabus"){
          await genSyllabus.create({
            Code: obj.Code,
            Plan:obj.Plan,
            textBook: obj.textBook ,
            referenceBook:obj.referenceBook
            })
          await Promise.all(SOS.map(async(i)=>{
            const pcors = await ProgramCourses.findOne({Program:i.Program,Code:obj.Code})            
            const pCDF = await CDFdoc.findOne({Program:i.Program,Code:obj.Code})
            const pSyllabus = await Syllabusdoc.findOne({Program:i.Program,Code:obj.Code})

            if(pcors&&pCDF&&!pSyllabus){
            const Syllabus = await Syllabusdoc.create({
              Program:i.Program,
              Code: obj.Code,
              Plan:obj.Plan,
              textBook: obj.textBook ,
              referenceBook:obj.referenceBook
              })
              console.log("finalSyllabus",Syllabus)
              }  
            }
            ) 
          )
        }
        if(task.taskType=="Update Syllabus"){
          await genSyllabus.findOneAndUpdate({Code: obj.Code,},{
            Code: obj.Code,
            Plan:obj.Plan,
            textBook: obj.textBook ,
            referenceBook:obj.referenceBook
            })
          await Promise.all(SOS.map(async(i)=>{
            const pcors = await ProgramCourses.findOne({Program:i.Program,Code:obj.Code})            
            const pCDF = await CDFdoc.findOne({Program:i.Program,Code:obj.Code})
            const pSyllabus = await Syllabusdoc.findOne({Program:i.Program,Code:obj.Code})

            if(pcors&&pCDF&&pSyllabus){
            const Syllabus = await Syllabusdoc.findOneAndUpdate({Program:i.Program,
              Code: obj.Code},{
              Program:i.Program,
              Code: obj.Code,
              Plan:obj.Plan,
              textBook: obj.textBook ,
              referenceBook:obj.referenceBook
              })
              console.log("finalSyllabus",Syllabus)}
              }
            ) 
          )
        }
           
        
        await ReturnedSyllabus.deleteOne({Code:task.Course.Code})        
        const newtask  = await Task.findByIdAndUpdate(task._id,task)
        await VaersionSyllabus.deleteMany({Code:task.Course.Code})        
        await res.status(200).json("genSyllabus");
      }
    } catch (err) {
      console.log("\n\nerror msg",err,"\n\nerror msg");  
      res.status(400).json("error");
        
    }
  };

module.exports.Revision = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");
      const task = await Task.findById(req.params.id).populate("Course").populate("User")
      .populate({path:"User",Model:"User", populate:{path:"CourseCDF",model:"Repo"}})
      .populate({path:"User",Model:"User", populate:{path:"CourseCreation",model:"Repo"}})
      .populate({path:"User",Model:"User", populate:{path:"CourseSyllabus",model:"Repo"}});
      
      task.Status = "Revision"      

      task.User?.map((item)=>{
        
        Userdoc.findById({_id:item}).then(
          (res)=>{
            Mail.TaskRevision(task,res.Email)
          }) 
        
      })
      if(task.taskType=="Create Catalog Description"||task.taskType=="Update Catalog Description"){
        await Promise.all(task.User.map(async(i)=>{
          newCourseCreation=[...i.CourseCreation,task.Course._id]
          const up = await Userdoc.findOneAndUpdate({ _id: i._id },{CourseCreation:newCourseCreation});
          console.log("user",up)
        }))
        await ReturnCourse.deleteOne({Code:task.Course.Code})

      }
      else if(task.taskType=="Create CDF"||task.taskType=="Update CDF"){
        await Promise.all(task.User.map(async(i)=>{
          newCourseCDF=[...i.CourseCDF,task.Course._id]
          const up = await Userdoc.findOneAndUpdate({ _id: i._id },{CourseCDF:newCourseCDF});          
          console.log("user",up)
          
        }))
        await ReturnedCDF.deleteOne({Code:task.Course.Code})
      }
      else if(task.taskType=="Create SOS"||task.taskType=="Update SOS"){       
        await Promise.all(task.User.map(async(i)=>{
          newSOSCreation=[...i.SOSCreation,{Program:task.Program}]          
          const up = await Userdoc.findOneAndUpdate({ _id: i._id },{SOSCreation:newSOSCreation});
          console.log("user",up)
        }))
        await ReturnedSOS.deleteOne({Program:task.Program})
      }
      else if(task.taskType=="Create Syllabus"||task.taskType=="Update Syllabus"){
        await Promise.all(task.User.map(async(i)=>{
          newCourseSyllabus=[...i.CourseSyllabus,task.Course._id]
          const up = await Userdoc.findOneAndUpdate({ _id: i._id },{CourseSyllabus:newCourseSyllabus});      
          console.log("user",up)
        }))
        await ReturnedSyllabus.deleteOne({Code:task.Course.Code})

      }
      const newtask  = await Task.findByIdAndUpdate(task._id,task)      

      console.log(newtask)
      
      res.status(200).json(newtask);
    } catch (err) {
        res.status(400).json("error");
        console.log(err);
    }
  };
