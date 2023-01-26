var meetingdoc = require("../../Models/Meeting");
var taskmeetingdoc = require("../../Models/TaskMeeting");
var ideal=require("../../Models/idealtime")
var User=require("../../Models/User")
var Mail=require("../../helpers/mailing")
var Task=require("../../Models/InitTask")


module.exports.Create = async (req, res) => {
  try {
    // if (!req.user) return await res.json("Timed Out");
    const meeting = await taskmeetingdoc.create(req.body);
    console.log("meeting added", req.body);
    var array=[]
    req.body.taskType.map((item)=>{
      array.push(item.taskType)
    })
    console.log("adas",array)
    req.body?.teacher_id.map((item)=>{
       User.findById({_id:item}).then((re)=>{
        console.log("ress",re)
        Mail.MeetingDetails(re.Email,req.body.dateTime,array)
       })
    })
    await res.json(meeting);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Update = async (req, res) => {
  const body = req.body;
  try {
    // if (!req.user) return await res.json("Timed Out");
    const meeting = await taskmeetingdoc.findOneAndUpdate({ _id: body.id }, body);
    console.log("meeting updated", meeting);
    var array=[]
    meeting.taskType.map((item)=>{
      array.push(item.taskType)
    })
    meeting.teacher_id.map((item)=>{
      User.findById({_id:item}).then((re)=>{
       console.log("ress",re)
       Mail.MeetingUpdates(re.Email,req.body.dateTime,array)
      })
   })
    await res.json(meeting);
  } catch (err) {
    console.log(err);
  }
};
module.exports.AddAvailability = async (req, res) => {
  const time = { time: req.body, teacher_id: req.params.tid };
  try {
    // if (!req.user) return await res.json("Timed Out");
    const meeting = await meetingdoc.create(time);
    console.log("meeting updated", meeting);
    const resss=await User.find({})
    console.log("ds",resss)
    resss.map((item)=>{
      if(item.Roles[0]=="Admin"){
        User.findById({_id:meeting.teacher_id}).then((re)=>{
          console.log("ress",re)
          Mail.AvailabilityDetails(item.Email,re.Name,meeting.time)
      })
      }
    })
      
    await res.json(meeting);
  } catch (err) {
    console.log(err);
  }
};
module.exports.UpdateAvailability = async (req, res) => {
  const time = { time: req.body, teacher_id: req.params.tid };
  try {
    // if (!req.user) return await res.json("Timed Out");
    const meeting = await meetingdoc.findOneAndUpdate({ teacher_id: time.teacher_id }, time);
    console.log("meeting updated", meeting);
    await res.json(meeting);
  } catch (err) {
    console.log(err);
  }
};
module.exports.deleteAvailability = async (req, res) => {
  const time = { time: req.body, teacher_id: req.params.tid };
  try {
    // if (!req.user) return await res.json("Timed Out");
    const meeting = await meetingdoc.deleteMany();
    console.log("meeting updated", meeting);
   User.find({}).then((resss)=>{
    resss.map((item)=>{
      if(item.Roles[1]=="CAC"){
        Mail.ResetAvailability(item.Email)
      }
    })
    })
   
    
    await res.json(meeting);
  } catch (err) {
    console.log(err);
  }
};
module.exports.GetAvailability = async (req, res) => {
  try {
    // if (!req.user) return await res.json("Timed Out");
    const meeting = await meetingdoc
      .findOne({
        teacher_id: req.params.tid,
      })
      .populate("teacher_id");
    //   console.log("meeting added", meeting);
    await res.json(meeting);
  } catch (err) {
    console.log(err);
  }
};
module.exports.GetAllAvailability = async (req, res) => {
  try {
    // if (!req.user) return await res.json("Timed Out");
    const meeting = await meetingdoc.find({}).populate("teacher_id");
    //   console.log("meeting added", meeting);
    await res.json(meeting);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Delete = async (req, res) => {
  console.log(req.params.id);
  try {
    // if (!req.user) return await res.json("Timed Out");
    const meeting = await taskmeetingdoc.findOneAndDelete({ _id: req.params.id });
    console.log("meeting deleted", meeting);
    var array=[]
    meeting.taskType.map((item)=>{
      Task.findById({_id:item}).then((res)=>{
        array.push(res.taskType)

        console.log("ite",res)
      })
      
    })
    meeting.teacher_id.map((item)=>{
      User.findById({_id:item}).then((re)=>{
       console.log("ress",re)
       Mail.Meetingdeleted(re.Email,meeting.dateTime,array)
      })
   })
    await res.json(meeting);
  } catch (err) {
    console.log(err);
  }
};

module.exports.GetMeeting = async (req, res) => {
  try {
    // if (!req.user) return await res.json("Timed Out");
    const meeting = await taskmeetingdoc.findOne({ _id: req.params.id });
    //   console.log("meeting added", meeting);
    await res.json(meeting);
  } catch (err) {
    console.log(err);
  }
};
module.exports.GetAll = async (req, res) => {
  try {
    // if (!req.user) return await res.json("Timed Out");
    const meeting = await taskmeetingdoc.find().populate("teacher_id taskType");
       console.log("meetingssss", meeting);
    await res.json(meeting);
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateideal = async (req, res) => {

  try {
    const idealtimee=await ideal.findOne({})
    
    if(idealtimee!=undefined){
      const i=await ideal.findOneAndUpdate({_id:idealtimee._id},{idealtime:req.body})
      console.log("i in if",i)
      await res.json(i);

    }
    else{
      const i=await ideal.create({idealtime:req.body})
      console.log("i in else",i)
      await res.json(i);
    }
    // if (!req.user) return await res.json("Timed Out");
    //console.log("meeting updated", meeting);
    
  } catch (err) {
    console.log(err);
  }
};

module.exports.getideal = async (req, res) => {
  try {
    // if (!req.user) return await res.json("Timed Out");
    const idealtime = await ideal.find({});
       console.log("ideals", idealtime);
    await res.json(idealtime);
  } catch (err) {
    console.log(err);
  }
};