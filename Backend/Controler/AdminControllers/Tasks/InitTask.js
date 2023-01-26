// var InitTask = require("../../../Models/InitTask");
// var Task = require("../../../Models/Tasks");
// var Userdoc = require("../../../Models/User");
// module.exports.Add = async (req, res) => {
//   try {
//     if (!req.user) return await res.status(401).json("Timed Out");
//     if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
//     console.log(req.body)
//     const Inittask = await InitTask.create(req.body);
//     console.log("InitTask added", Inittask);
//     await res.status(201).json(Inittask);
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports.UpdateTaskInit = async (req, res) => {
//   try {
//     if (!req.user) return await res.status(401).json("Timed Out");
//     if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
//     // const Taskold = await InitTask.findOne({ _id: req.params.id }).populate("AssignMember").populate({path:"Task",Model:"Task"
//     // ,populate:{path:"User",Model:"User"}})
//     // await Promise.all(Taskold.Task.map(async(e)=>{

//     //   await Promise.all(req.body.AssignMember.map(async(i)=>{
//     //     if(e.taskType=="Create Catalog Description"&&!e.User.includes(i)){
//     //       await Promise.all(e.User.map((j)=>{
//     //         newCourseCreation=[...j.CourseCreation,i.Course._id]
//     //         update = true
//     //       }))
//     //     }

//     //   else if(e.taskType=="Create CDF"&&!e.User.CourseCDF.includes(e.Course._id)){
//     //       newCourseCDF=[...i.CourseCDF,e.Course._id]
//     //       update = true
//     //     }
//     //   else if(e.taskType=="Create Syllabus"&&!e.User.CourseSyllabus.includes(e.Course._id)){
//     //       newCourseSyllabus=[...i.User.CourseSyllabus,e.Course._id]
//     //       update = true
//     //     }
//     //   else if(e.taskType=="Create SOS"||e.taskType=="Update SOS"){
//     //       newSOSCreation=[...i.SOSCreation,{Program:e.Program}]
//     //     }
//     //   }))

//     // }))
//     const IniTask = await InitTask.findOneAndUpdate(
//       { _id: req.params.id },
//       req.body
//     );
//     console.log("all InitTasks", IniTask);
//     await res.json(IniTask);
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports.UpdateInside = async (req, res) => {
//   try {
//     if (!req.user) return await res.status(401).json("Timed Out");
//     if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
//     const Taskold = await InitTask.findOne({ _id: req.params.id }).populate("AssignMember").populate({path:"Task",Model:"Task"
//     ,populate:{path:"User",Model:"User"}})
//     await Promise.all(Taskold.Task.map(async(e)=>{
//       if(e.taskType=="Create Catalog Description"||e.taskType=="Update Catalog Description"){
//         console.log("here")
//         await Promise.all(e.User.map(async(i)=>{
//         console.log("inside")
//         var USE = await Userdoc.findById(i._id)

//         const newCourseCreation =  USE.CourseCreation.filter((x)=>{
//           console.log("filteredConditon",x._id)
//           console.log("filteredConditon",e.Course)
//           console.log("filteredConditon",!x.equals(e.Course))
//           console.log("filteredConditon",!x._id.equals(e.Course))

//           if(!x._id.equals(e.Course)) return x._id
//           })
//           console.log("filtered",newCourseCreation)
//           await Userdoc.findByIdAndUpdate(i._id,{CourseCreation:newCourseCreation})
//         }))
//       }
//       else if(e.taskType=="Create CDF"||e.taskType=="Update CDF"){
//         await Promise.all(e.User.map(async(i)=>{
//           const newCourseCDF =  i.CourseCDF.filter((x)=>{
//               if(!x.equals(e.Course)) return x._id
//             })
//             await Userdoc.findByIdAndUpdate(i._id,{CourseCDF:newCourseCDF})
//           }))
//         }
//       else if(e.taskType=="Create Syllabus"||e.taskType=="Update Syllabus"){
//         await Promise.all(e.User.map(async(i)=>{
//           const newCourseSyllabus =  i.CourseSyllabus.filter((x)=>{
//               if(!x.equals(e.Course)) return x._id
//             })
//             await Userdoc.findByIdAndUpdate(i._id,{CourseSyllabus:newCourseSyllabus})
//           }))
//         }
//       else if(e.taskType=="Create SOS"||e.taskType=="Update SOS"){
//         await Promise.all(e.User.map(async(i)=>{
//           const newSOSCreation =  i.SOSCreation.filter((x)=>{
//               if(x.Program!=e.Program) return x._id
//             })
//             await Userdoc.findByIdAndUpdate(i._id,{SOSCreation:newSOSCreation})
//           }))
//         }
//         await Task.deleteOne({_id:e._id})
//     }))
//      console.log("body",req.body)
//      const Tasks= await Promise.all(req.body.obj.map(async(e)=>{
//       try{
//        if(e.taskType=="Create SOS"||e.taskType=="Update SOS"){
//          const task = await Task.create({taskType:e.taskType,User:e.User,Deadline:e.Deadline
//          ,Status:e.Status,Program:e.Program,Comment:e.Comment})
//          console.log("\n\nTASK",task)
//          return task

//        }
//        else{
//          const task = await Task.create({taskType:e.taskType,User:e.User,Deadline:e.Deadline
//          ,Status:e.Status,Course :e.Course,Program:e.Program,Comment:e.Comment})
//          console.log("\n\nTASK",task)
//          return task
//          }
//        }
//        catch(er){
//            console.error(er);
//        }
//      }))
//      await Promise.all(req.body.obj.map(async(e)=> {
//       if(e.taskType=="Create Catalog Description"||e.taskType=="Update Catalog Description"){
//         console.log("\ncatsss",e)
//         await Promise.all(e.User.map(async(i)=>{
//           var use = await Userdoc.findOne({ _id: i._id });
//           var newCourseCreation=[...use.CourseCreation]
//           newCourseCreation.push(e.Course._id)
//           const up = await Userdoc.findOneAndUpdate({ _id: i._id },{CourseCreation:newCourseCreation});
//           console.log("User Updated",up)
//         }))
//       }
//       else if(e.taskType=="Create SOS"||e.taskType=="Update SOS"){
//         await Promise.all(e.User.map(async(i)=>{
//           var use = await Userdoc.findOne({ _id: i._id });
//           var newSOSCreation=[...use.SOSCreation]
//           newSOSCreation.push({Program:e.Program})
//           const up = await Userdoc.findOneAndUpdate({ _id: i._id },{SOSCreation:newSOSCreation});
//           console.log("User Updated",up)
//         }))
//       }
//       else if(e.taskType=="Create CDF"||e.taskType=="Update CDF"){
//         await Promise.all(e.User.map(async(i)=>{
//           var use = await Userdoc.findOne({ _id: i._id });
//           var newCourseCDF=[...use.CourseCDF]
//           newCourseCDF.push(e.Course._id)
//           const up = await Userdoc.findOneAndUpdate({ _id: i._id },{CourseCDF:newCourseCDF});
//         }))
//       }
//       else if(e.taskType=="Create Syllabus"||e.taskType=="Update Syllabus"){
//         await Promise.all(e.User.map(async(i)=>{
//           var use = await Userdoc.findOne({ _id: i._id });
//           var newCourseSyllabus=[...use.CourseSyllabus]
//           newCourseSyllabus.push(e.Course._id)
//           const up = await Userdoc.findOneAndUpdate({ _id: i._id },{CourseSyllabus:newCourseSyllabus});
//         }))
//       }

//       }));
//      const ini = await InitTask.findOne({_id: req.params.id})
//      ini.Task =  Tasks
//      const up2 = await InitTask.findOneAndUpdate({_id: req.params.id},ini);
//      console.log("Task added", Tasks);
//      await res.status(201).json(Tasks);
//    } catch (err) {
//     console.log(err);
//   }
// };

//   module.exports.ShowOne = async (req, res) => {
//     try {
//       if (!req.user) return await res.status(401).json("Timed Out");
//       if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
//       const InitTasks = await InitTask.findById(req.params.id).populate("AssignMember").populate("Task").populate({path:"Task",model:"Task",populate:{path: 'User', model: 'User'}})
//       .populate ({path:"Task",model:"Task",populate:{path:'Course',model:'Repo'}});
//       console.log("one task", InitTasks);
//       await res.status(200).json(InitTasks);
//     } catch (err) {
//       console.log(err);
//     }
//   };

// module.exports.Delete = async (req, res) => {
//   try {
//     if (!req.user) return await res.status(401).json("Timed Out");
//     if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
//     const Inis1 = await InitTask.findById(req.params.id).populate("AssignMember")
//     console.log("ini",Inis1.Task)
//     var clone =[]
//     Inis1.Task.forEach(async(e) => {

//       const abc = await Task.findById(e).populate("User")
//       if(abc.taskType=="Create Catalog Description"||abc.taskType=="Update Catalog Description"){
//       //     clone = (abc.User.CourseCreation.filter((i)=>{
//       //     if(!i.equals(abc.Course))return i
//       //   }))
//       //   console.log("\n\n\n clone",clone)
//       //   abc.User.CourseCreation=clone
//        const up = await Userdoc.updateOne({ _id: {$in:abc.User} },
//           { $pullAll : { CourseCreation :[ {_id : abc.Course }] } },
//           { multi : true }
//         )
//         console.log("\n\nup",up)
//       }

//     else if(abc.taskType=="Create CDF"||abc.taskType=="Update CDF"){
//       const up = await Userdoc.updateOne({ _id: {$in:abc.User} },
//         { $pullAll : { CourseCDF :[ {_id : abc.Course }] } },
//         { multi : true }
//       )
//       console.log("\n\nup",up)
//     }
//     else if(abc.taskType=="Create Syllabus"||abc.taskType=="Update Syllabus"){
//       const up = await Userdoc.updateOne({ _id: {$in:abc.User} },
//         { $pullAll : { CourseSyllabus :[ {_id : abc.Course }] } },
//         { multi : true }
//       )
//       console.log("\n\nup",up)
//     }

//     else if(abc.taskType=="Create SOS"||abc.taskType=="Update SOS"){
//       const up = await Userdoc.updateOne({ _id: {$in:abc.User} },
//         { $pullAll : { SOSCreation :[ {Program : abc.Program }] } },
//         { multi : true }
//       )
//       console.log("\n\nup",up)
//     }
//     //  const up =  await Userdoc.findByIdAndUpdate({ _id: abc.User._id },abc.User);
//     //  console.log("\n\nabc.user",abc.User,"\n\nup",up)
//      await Task.deleteOne({ _id: e });
//     })
//     const Inittask = await InitTask.deleteOne({ _id: req.params.id });
//     await res.status(204).json(Inittask);
//   } catch (err) {
//     console.log(err);
//   }
// };
// module.exports.Showall = async (req, res) => {
//     try {
//       if (!req.user) return await res.status(401).json("Timed Out");
//       if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
//       const InitTasks = await InitTask.find({}).populate("AssignMember").populate("Task")
//       const retn = await Promise.all(InitTasks.filter(async(i)=>{
//         if(i.Task.length<1)return i
//         else{
//           var check = false
//           await Promise.all(i.Task.map(async(e)=>{
//             if(e.status!="Finished"){
//               const date=new Date(Date.now())
//               const date2=new Date(e.Deadline)
//               if(e.status!="Returned"&&date2<date){
//                 const task  = await Task.findOne({_id:e._id})
//                 task.Status = "Late"
//                 const newtask  = await Task.findByIdAndUpdate(task._id,task)
//               }
//               check = true}
//           }))
//           if(check)return i
//         }
//       }))
//       console.log("all InitTasks", retn);
//       await res.json(retn);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   module.exports.ShowallDone = async (req, res) => {
//     try {
//       if (!req.user) return await res.status(401).json("Timed Out");
//       if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
//       const InitTasks = await InitTask.find({}).populate("AssignMember").populate("Task")
//       const retn = InitTasks.filter((i)=>{
//         var check = true
//         i.Task.forEach((e)=>{
//           if(e.status!="Finished"){check = false}
//         })
//         if(check)return i
//       })

//       console.log("all InitTasks", retn);
//       await res.json(retn);
//     } catch (err) {
//       console.log(err);
//     }
//   };

// module.exports.ShowallReport = async (req, res) => {
//     try {
//       if (!req.user) return await res.status(401).json("Timed Out");
//       if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
//       const InitTasks = await InitTask.find({}).populate("AssignMember")
//       .populate({path:"Task",model:"Task",populate:{path:"User",model:"User"}})
//       .populate({path:"Task",model:"Task",populate:{path:"Course",model:"Repo"}})
//       console.log("all InitTasks", InitTasks);
//       await res.json(InitTasks);
//     } catch (err) {
//       console.log(err);
//     }
//   };

// module.exports.ShowOneReport = async (req, res) => {
//   try {
//     if (!req.user) return await res.status(401).json("Timed Out");
//     if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
//     const InitTasks = await InitTask.findById(req.params.id).populate("AssignMember")
//     .populate({path:"Task",model:"Task",populate:{path:"User",model:"User"}})
//     .populate({path:"Task",model:"Task",populate:{path:"Course",model:"Repo"}})
//     console.log("one task", InitTasks);
//     await res.status(200).json(InitTasks);
//   } catch (err) {
//     console.log(err);
//   }
//   };
// // module.exports.Showallnotass = async (req, res) => {
// //   try {
// //     if (!req.user) return await res.status(401).json("Timed Out");
// //     if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
// //     const InitTasks = await InitTask.find({}).populate("AssignMember");
// //     const response = InitTasks.filter((i)=>{
// //         if(i.Task==null)return i
// //     })
// //     console.log("all InitTasks", response);
// //     await res.json(response);
// //   } catch (err) {
// //     console.log(err);
// //   }
// // };

// // module.exports.Showallass = async (req, res) => {
// //     try {
// //       if (!req.user) return await res.status(401).json("Timed Out");
// //       if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
// //       const InitTasks = await InitTask.find({}).populate("AssignMember");
// //       console.log("all InitTasks", InitTasks);
// //       await res.json(InitTasks);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };
// // module.exports.UpdateTaskInit = async (req, res) => {
// //   try {
// //     if (!req.user) return await res.status(401).json("Timed Out");
// //     if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
// //     const InitTasks = await InitTask.findOneAndUpdate({ _id: req.params.id },req.body);
// //     console.log("all InitTasks", InitTasks);
// //     await res.json(InitTasks);
// //   } catch (err) {
// //     console.log(err);
// //   }
// // };

var InitTask = require("../../../Models/InitTask");
var Task = require("../../../Models/Tasks");
var Userdoc = require("../../../Models/User");
const Mail = require("../../../helpers/mailing");
var taskmeetingdoc = require("../../../Models/TaskMeeting");

const todaydate= new Date()
console.log("tds",todaydate.getHours())
if(todaydate.getHours()==7 && todaydate.getMinutes()==30){

const task= Task.find({}).populate("User Course").then((Res)=>{
  const today = new Date()
  console.log("today",today.getMinutes())
const yesterday = new Date(today)

yesterday.setDate(yesterday.getDate() + 1)
  const datetomatch=yesterday.getDate()+"-"+(yesterday.getMonth()+1)+"-"+yesterday.getFullYear()
  
  Res.map((item)=>{
    const itemdate=new Date(item.Deadline)
    const itdate=itemdate.getDate()+"-"+(itemdate.getMonth()+1)+"-"+itemdate.getFullYear()
    if(itdate==datetomatch){
      item.User?.map((it)=>{
       Mail.TaskDeadlineOne(item,it.Email)

      })
   
    }
  })
})


const meetings= taskmeetingdoc.find({}).populate("taskType teacher_id").then((Res)=>{
 // console.log("ressa",Res)
  const today = new Date()
const yesterday = new Date(today)

yesterday.setDate(yesterday.getDate() + 1)
 // console.log("phelloy",yesterday)
  const datetomatch=yesterday.getDate()+"-"+(yesterday.getMonth()+1)+"-"+yesterday.getFullYear()
  const previousday=yesterday.getDay()+""
  console.log("datetomatchinmeetings",datetomatch)
  console.log("datets",previousday)
  const daysarray=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  Res.map((item)=>{
    var array=[]
    item.taskType.map((item)=>{
      array.push(item.taskType)
    })
    if(item.dateTime.includes(" ")){
      if(item.dateTime.includes(daysarray[previousday-1])){
        console.log("hello",array)
        item.teacher_id.map((i)=>{
        Mail.MeetingReminder(i.Email,item.dateTime,array)
        })
      }
    }else{
      const itemdate=new Date(item.dateTime)
    const itdate=itemdate.getDate()+"-"+(itemdate.getMonth()+1)+"-"+itemdate.getFullYear()
      if(itdate==datetomatch){
        item.teacher_id.map((i)=>{
         Mail.MeetingReminder(i.Email,item.dateTime,array)
        })
      }
    }
    const itemdate=new Date(item.Deadline)
    const itdate=itemdate.getDate()+"-"+(itemdate.getMonth()+1)+"-"+itemdate.getFullYear()
    if(itdate==datetomatch){
      item.User?.map((it)=>{
        Mail.TaskDeadlineOne(item,it.Email)

      })
      console.log(item)
      console.log("hello")
    }
  })
})
}

module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin"))
      return await res.status(401).json("UnAutherized");
    console.log(req.body);
    const Inittask = await InitTask.create(req.body);
    console.log("InitTask added", Inittask);
    await res.status(201).json(Inittask);
  } catch (err) {
    console.log(err);
  }
};

module.exports.UpdateTaskInit = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin"))
      return await res.status(401).json("UnAutherized");
    // const Taskold = await InitTask.findOne({ _id: req.params.id }).populate("AssignMember").populate({path:"Task",Model:"Task"
    // ,populate:{path:"User",Model:"User"}})
    // await Promise.all(Taskold.Task.map(async(e)=>{

    //   await Promise.all(req.body.AssignMember.map(async(i)=>{
    //     if(e.taskType=="Create Catalog Description"&&!e.User.includes(i)){
    //       await Promise.all(e.User.map((j)=>{
    //         newCourseCreation=[...j.CourseCreation,i.Course._id]
    //         update = true
    //       }))
    //     }

    //   else if(e.taskType=="Create CDF"&&!e.User.CourseCDF.includes(e.Course._id)){
    //       newCourseCDF=[...i.CourseCDF,e.Course._id]
    //       update = true
    //     }
    //   else if(e.taskType=="Create Syllabus"&&!e.User.CourseSyllabus.includes(e.Course._id)){
    //       newCourseSyllabus=[...i.User.CourseSyllabus,e.Course._id]
    //       update = true
    //     }
    //   else if(e.taskType=="Create SOS"||e.taskType=="Update SOS"){
    //       newSOSCreation=[...i.SOSCreation,{Program:e.Program}]
    //     }
    //   }))

    // }))
    const IniTask = await InitTask.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    
    console.log("all InitTasks", IniTask);
    await res.json(IniTask);
  } catch (err) {
    console.log(err);
  }
};

module.exports.UpdateInside = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin"))
      return await res.status(401).json("UnAutherized");
    const Inis1 = await InitTask.findById(req.params.id).populate(
      "AssignMember"
    );
    console.log("ini", Inis1.Task);
    Promise.all(
      Inis1.Task.map(async (e) => {
        const abc = await Task.findById(e).populate("User");
        await Promise.all(
          abc.User.map(async (j) => {
            if (
              abc.taskType == "Create Catalog Description" ||
              abc.taskType == "Update Catalog Description"
            ) {
              //     clone = (abc.User.CourseCreation.filter((i)=>{
              //     if(!i.equals(abc.Course))return i
              //   }))
              //   console.log("\n\n\n clone",clone)
              //   abc.User.CourseCreation=clone
              const up = await Userdoc.updateOne(
                { _id: j._id },
                { $pullAll: { CourseCreation: [{ _id: abc.Course }] } },
                { multi: true }
              );
              console.log("\n\nup", up);
            } else if (
              abc.taskType == "Create CDF" ||
              abc.taskType == "Update CDF"
            ) {
              const up = await Userdoc.updateOne(
                { _id: j._id },
                { $pullAll: { CourseCDF: [{ _id: abc.Course }] } },
                { multi: true }
              );
              console.log("\n\nup", up);
            } else if (
              abc.taskType == "Create Syllabus" ||
              abc.taskType == "Update Syllabus"
            ) {
              const up = await Userdoc.updateOne(
                { _id: j._id },
                { $pullAll: { CourseSyllabus: [{ _id: abc.Course }] } },
                { multi: true }
              );
              // const up = await Userdoc.updateOne({ _id: {$in:abc.User} },
              //   { $pullAll : { CourseSyllabus :[ {_id : abc.Course }] } },
              //   { multi : true }
              // )
              console.log("\n\nup", up);
            } else if (
              abc.taskType == "Create SOS" ||
              abc.taskType == "Update SOS"
            ) {
              const upuser = await Userdoc.findOne({ _id: j._id });
              var newSOSCreation = []
              upuser.SOSCreation.map((j)=>{

                if(j.Program!=abc.Program&&!newSOSCreation.some(k=>k.Program==j.Program)){
                 newSOSCreation.push(j)
                }  
              })
              const up = await Userdoc.findOneAndUpdate(
                { _id: j._id },{SOSCreation:[...newSOSCreation]}
              );
              console.log("\n\nup", up);
            }
          })
        );
        //  const up =  await Userdoc.findByIdAndUpdate({ _id: abc.User._id },abc.User);
        //  console.log("\n\nabc.user",abc.User,"\n\nup",up)
        await Task.deleteOne({ _id: e });
      })
    );

    console.log("body", req.body);

    console.log("body.obj", req.body.obj);

    var Tasks = await Promise.all(
      req.body.obj.map(async (e) => {
        try {
          if (e.taskType == "Create SOS" || e.taskType == "Update SOS") {
            const task = await Task.create({
              taskType: e.taskType,
              User: e.User,
              Deadline: e.Deadline,
              Status: e.Status,
              Program: e.Program,
              Comment: e.Comment,
            });
            console.log("\n\nTASK", task);
            return task;
          } else {
            const task = await Task.create({
              taskType: e.taskType,
              User: e.User,
              Deadline: e.Deadline,
              Status: e.Status,
              Course: e.Course,
              Program: e.Program,
              Comment: e.Comment,
            });
            console.log("\n\nTASK", task);
            return task;
          }
        } catch (er) {
          console.error(er);
        }
      })
    );
    console.log("body", req.body);
    const ini = await InitTask.findById(req.params.id).populate("AssignMember");
    var arrays = ini.AssignMember.map((i) => {
      return i;
    });
    console.log("arrays", arrays);
    await Promise.all(
      req.body.obj.map(async (e) => {
        if (
          e.taskType == "Create Catalog Description" ||
          e.taskType == "Update Catalog Description"
        ) {
          e.User.map(async (i) => {
            var ind = arrays.findIndex((j) => j._id.equals(i._id));
            arrays[ind].CourseCreation.push(e.Course._id);
          });
        } else if (e.taskType == "Create SOS" || e.taskType == "Update SOS") {
          e.User.map(async (i) => {
            var ind = arrays.findIndex((j) => j._id.equals(i._id));
            arrays[ind].SOSCreation.push({Program:e.Program})
            var newSOSCreation = []
            arrays[ind].SOSCreation.map((j)=>{
                if(!newSOSCreation.some(k=>k.Program==j.Program)){
                   newSOSCreation.push(j)
                }  
              })
            arrays[ind].SOSCreation=newSOSCreation
          });
        } else if (e.taskType == "Create CDF" || e.taskType == "Update CDF") {
          e.User.map(async (i) => {
            var ind = arrays.findIndex((j) => j._id.equals(i._id));
            arrays[ind].CourseCDF.push(e.Course._id);
          });
        } 
        else if (
          e.taskType == "Create Syllabus" ||
          e.taskType == "Update Syllabus"
        ) {
          e.User.map(async (i) => {
            var ind = arrays.findIndex((j) => j._id.equals(i._id));
            arrays[ind].CourseSyllabus.push(e.Course._id);
          });
        }
      })
    );

    console.log("arrays", arrays);
    var abc = await Promise.all(
      arrays.map(async (i) => {
        if (
          ini.taskType == "Create Catalog Description" ||
          ini.taskType == "Update Catalog Description"
        ) {
          var up2 = await Userdoc.findOneAndUpdate(
            { _id: i._id },
            { CourseCreation: i.CourseCreation }
          );
          console.log(up2);
          return up2;
        } else if (
          ini.taskType == "Create CDF" ||
          ini.taskType == "Update CDF"
        ) {
          var up2 = await Userdoc.findOneAndUpdate(
            { _id: i._id },
            { CourseCDF: i.CourseCDF }
          );
          console.log(up2);
          return up2;
        } 
        else if (
          ini.taskType == "Create Syllabus" ||
          ini.taskType == "Update Syllabus"
        ) {
          var up2 = await Userdoc.findOneAndUpdate(
            { _id: i._id },
            { CourseSyllabus: i.CourseSyllabus }
          );
          console.log(up2);
          return up2;
        } 
        else if (
          ini.taskType == "Create SOS" ||
          ini.taskType == "Update SOS"
        ) {
          var up2 = await Userdoc.findOneAndUpdate(
            { _id: i._id },
            { SOSCreation: i.SOSCreation }
          );
          console.log(up2);
        }
      })
    );
    console.log("abc", abc);
    ini.Task = Tasks;
    const up2 = await InitTask.findOneAndUpdate({ _id: req.params.id }, ini);
    console.log("Task added", up2);
    

      up2.AssignMember.map((item)=>{
        console.log("fj",item)
        Userdoc.findById(item).then((res)=>{
          Mail.TaskEdited(up2,res.Email)

        })
      })
    
    await res.status(201).json(Tasks);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowOne = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin"))
      return await res.status(401).json("UnAutherized");
    const InitTasks = await InitTask.findById(req.params.id)
      .populate("AssignMember")
      .populate("Task")
      .populate({
        path: "Task",
        model: "Task",
        populate: { path: "User", model: "User" },
      })
      .populate({
        path: "Task",
        model: "Task",
        populate: { path: "Course", model: "Repo" },
      });
    console.log("one task", InitTasks);
    await res.status(200).json(InitTasks);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Delete = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin"))
      return await res.status(401).json("UnAutherized");
    const Inis1 = await InitTask.findById(req.params.id).populate(
      "AssignMember"
    );
    console.log("ini", Inis1?.Task);
    await Promise.all(
      Inis1?.Task?.map(async (e) => {
        const abc = await Task.findById(e).populate("User");
        await Promise.all(
          abc?.User?.map(async (j) => {
            if (
              abc.taskType == "Create Catalog Description" ||
              abc.taskType == "Update Catalog Description"
            ) {
              //     clone = (abc.User.CourseCreation.filter((i)=>{
              //     if(!i.equals(abc.Course))return i
              //   }))
              //   console.log("\n\n\n clone",clone)
              //   abc.User.CourseCreation=clone
              const up = await Userdoc.updateOne(
                { _id: j._id },
                { $pullAll: { CourseCreation: [{ _id: abc.Course }] } },
                { multi: true }
              );
              console.log("\n\nup", up);
            } else if (
              abc.taskType == "Create CDF" ||
              abc.taskType == "Update CDF"
            ) {
              const up = await Userdoc.updateOne(
                { _id: j._id },
                { $pullAll: { CourseCDF: [{ _id: abc.Course }] } },
                { multi: true }
              );
              console.log("\n\nup", up);
            } else if (
              abc.taskType == "Create Syllabus" ||
              abc.taskType == "Update Syllabus"
            ) {
              const up = await Userdoc.updateOne(
                { _id: j._id },
                { $pullAll: { CourseSyllabus: [{ _id: abc.Course }] } },
                { multi: true }
              );
              // const up = await Userdoc.updateOne({ _id: {$in:abc.User} },
              //   { $pullAll : { CourseSyllabus :[ {_id : abc.Course }] } },
              //   { multi : true }
              // )
              console.log("\n\nup", up);
            } else if (
              abc.taskType == "Create SOS" ||
              abc.taskType == "Update SOS"
            ) {              
              const upuser = await Userdoc.findOne({ _id: j._id });
              var newSOSCreation = []
              upuser.SOSCreation.map((j)=>{
                if(j.Program!=abc.Program&&!newSOSCreation.some(k=>k.Program==j.Program)){
                 newSOSCreation.push(j)
                }  
              })
              const up = await Userdoc.findOneAndUpdate(
                { _id: j._id },{SOSCreation:[...newSOSCreation]}
              );
              console.log("\n\nup", up);
            }
          })
        );
        //  const up =  await Userdoc.findByIdAndUpdate({ _id: abc.User._id },abc.User);
        //  console.log("\n\nabc.user",abc.User,"\n\nup",up)
        await Task.deleteOne({ _id: e });
      })
    );

    const Inittask = await InitTask.deleteOne({ _id: req.params.id });
    await res.status(204).json(Inittask);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Showall = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin"))
      return await res.status(401).json("UnAutherized");
    const InitTasks = await InitTask.find({})
      .populate("AssignMember")
      .populate("Task");
    const retn =[] 
    await Promise.all(
      InitTasks.map(async (i) => {
        var check = false;          
        if (i.Task.length==0) retn.push(i);
        else {
          await Promise.all(
            i.Task.map(async (e) => {
              if (e.Status!="Finished") {
                const date = new Date(Date.now());
                const date2 = new Date(e.Deadline);
                if (e.Status != "Returned" && date2 < date) {
                  const task = await Task.findOne({ _id: e._id });
                  task.Status = "Late";
                  const newtask = await Task.findByIdAndUpdate(task._id, task);
                }             
              }
            })
          );
          i.Task.forEach((e) => {
            if (e.Status != "Finished"){
              check = true;
            }
          });
          if (check) retn.push(i);
        }
      })
    );
    console.log("all InitTasks", retn);
    await res.json(retn);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowallDone = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin"))
      return await res.status(401).json("UnAutherized");
    const InitTasks = await InitTask.find({})
      .populate("AssignMember")
      .populate("Task");
    const retn = InitTasks.filter((i) => {
      var check = true;
      i.Task.forEach((e) => {
        if (e.Status != "Finished") {
          check = false;
        }
      });
      if (check) return i;
    });

    console.log("all InitTasks", retn);
    await res.json(retn);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowallReport = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin"))
      return await res.status(401).json("UnAutherized");
    const InitTasks = await InitTask.find({})
      .populate("AssignMember")
      .populate({
        path: "Task",
        model: "Task",
        populate: { path: "User", model: "User" },
      })
      .populate({
        path: "Task",
        model: "Task",
        populate: { path: "Course", model: "Repo" },
      });
    console.log("all InitTasks", InitTasks);
    await res.json(InitTasks);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowOneReport = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin"))
      return await res.status(401).json("UnAutherized");
    const InitTasks = await InitTask.findById(req.params.id)
      .populate("AssignMember")
      .populate({
        path: "Task",
        model: "Task",
        populate: { path: "User", model: "User" },
      })
      .populate({
        path: "Task",
        model: "Task",
        populate: { path: "Course", model: "Repo" },
      });
    console.log("one task", InitTasks);
    await res.status(200).json(InitTasks);
  } catch (err) {
    console.log(err);
  }
};
// module.exports.Showallnotass = async (req, res) => {
//   try {
//     if (!req.user) return await res.status(401).json("Timed Out");
//     if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
//     const InitTasks = await InitTask.find({}).populate("AssignMember");
//     const response = InitTasks.filter((i)=>{
//         if(i.Task==null)return i
//     })
//     console.log("all InitTasks", response);
//     await res.json(response);
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports.Showallass = async (req, res) => {
//     try {
//       if (!req.user) return await res.status(401).json("Timed Out");
//       if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
//       const InitTasks = await InitTask.find({}).populate("AssignMember");
//       console.log("all InitTasks", InitTasks);
//       await res.json(InitTasks);
//     } catch (err) {
//       console.log(err);
//     }
//   };
// module.exports.UpdateTaskInit = async (req, res) => {
//   try {
//     if (!req.user) return await res.status(401).json("Timed Out");
//     if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
//     const InitTasks = await InitTask.findOneAndUpdate({ _id: req.params.id },req.body);
//     console.log("all InitTasks", InitTasks);
//     await res.json(InitTasks);
//   } catch (err) {
//     console.log(err);
//   }
// };
