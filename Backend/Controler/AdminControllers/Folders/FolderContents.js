var TheoryContents = require("../../../Models/FolderContents/TheoryContents");
var LabContents = require("../../../Models/FolderContents/LabContents");
var TheoryReq= require("../../../Models/deadlineTheory");
var LabReq= require("../../../Models/deadlineLab");
var Mail=require("../../../helpers/mailing")
var User=require("../../../Models/User")
var Folders=require("../../../Models/Folders")
module.exports.Theory = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
    const old = await TheoryContents.findOne({});
    var obj=req.body
    if(req.body.Round=="Round1"){
        if(old){
            if(old.Mid=="Mid"){
                obj.Mid="Mid"
            }
            else if(old.Mid=="Sessional"){
                obj.Mid="Sessional"
            }
            else{
                obj.Mid="Mid"
            }
        }
        else{
            obj.Mid="Mid"
        }
    }

    console.log("Round1","Round2",obj)
    if(old){
        
        if(req.body.Round=="Round1"){
        await TheoryContents.findByIdAndUpdate(old._id,{Round1:obj.Round1,Round2:old.Round2,Mid:obj.Mid})}
        else if(req.body.Round=="Round2"){
        await TheoryContents.findByIdAndUpdate(old._id,{Round1:old.Round1,Round2:obj.Round2,Mid:obj.Mid})}
        
        }
    else{    
        
        if(req.body.Round=="Round1")
        await TheoryContents.create({Round1:obj.Round1,Mid:obj.Mid});
        else if(req.body.Round=="Round2")
        await TheoryContents.create(old._id,{Round2:obj.Round2,Mid:obj.Mid})
                
    }

    await res.status(201).json("TheoryContents");
  } catch (err) {
    console.log(err);
  }
};

module.exports.Lab = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
      const old = await LabContents.findOne({});
  
      var obj=req.body
      if(req.body.Round=="Round1"){
        if(old){
            if(old.Mid=="Mid"){
                obj.Mid="Mid"
            }
            else if(old.Mid=="Sessional"){
                obj.Mid="Sessional"
            }
            else{
                obj.Mid="Mid"
            }
        }
        else{
            obj.Mid="Mid"
        }
      }
  
      console.log("Round1","Round2",obj)
      if(old){
          
          if(req.body.Round=="Round1")
          await LabContents.findByIdAndUpdate(old._id,{Round1:obj.Round1,Mid:obj.Mid})
          else if(req.body.Round=="Round2")
          await LabContents.findByIdAndUpdate(old._id,{Round2:obj.Round2,Mid:obj.Mid})
          
          }
      else{    
          
          if(req.body.Round=="Round1")
          await LabContents.create({Round1:obj.Round1,Mid:obj.Mid});
          else if(req.body.Round=="Round2")
          await LabContents.create(old._id,{Round2:obj.Round2,Mid:obj.Mid})
                  
      }  
      await res.status(201).json("LabContents");
    } catch (err) {
      console.log(err);
    }
  };
  
  module.exports.MidSesTheory = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
      const old = await TheoryContents.findOne({});
      console.log(req.body)
      if(old){
        old.Round1.MidorSessioanls=req.body.MidSessional
        console.log("old",old)
          await TheoryContents.findByIdAndUpdate(old._id,old)
          await res.status(201).json("TheoryContents");
    
        }
      else{    
        await res.status(404).json("Not initizalized");     
                  
      }
  
    } catch (err) {
      console.log(err);
    }
  };
  
  module.exports.MidSesLab = async (req, res) => {
      try {
        if (!req.user) return await res.status(401).json("Timed Out");
        if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
        const old = await LabContents.findOne({});        
        console.log(req.body)
        if(old){
        old.Round1.MidorSessioanls=req.body.MidSessional
          await LabContents.findByIdAndUpdate(old._id,old)
          await res.status(201).json("LabContents");    
        }
      else{    
        await res.status(404).json("Not initizalized");     
                  
      }
  
    }  
     catch (err) {
        console.log(err);
      }
    };
    
  module.exports.ShowTheory = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");
      const aa = await TheoryContents.findOne({});
      console.log("aa", aa);
      await res.status(200).json(aa);
    } catch (err) {
      console.log(err);
    }
  };
  module.exports.ShowLab = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");
      const aa = await LabContents.findOne({});
      console.log("aa", aa);
      await res.status(200).json(aa);
    } catch (err) {
      console.log(err);
    }
  };

  module.exports.ShowLabReq = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");
      const aa = await LabReq.find({}).populate("Request_id");
      const bb=await TheoryReq.find({}).populate("Request_id");
      console.log("aa", bb);
      await res.status(200).json({Lab:aa,Theory:bb});
    } catch (err) {
      console.log(err);
    }
  };

  module.exports.updatedate = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");
      console.log("req.dataaaa",req.body)
      if(req.body.type=="Lab"){
        const old = await LabContents.findOne({});        
        const datee=new Date(req.body.date)
        console.log("date",datee)
        if(req.body.round=="Round1"){
          const obj={Quiz:old.Round1.Quiz,Assignment:old.Round1.Assignment,Deadline:datee}
         // await LabContents.findByIdAndUpdate(old._id,{Round1:obj})
          const resss=await LabReq.findByIdAndUpdate(req.body._id,{pending:false,Deadline:(datee.getDate()+"/"+(datee.getMonth()+1)+"/"+datee.getFullYear()+" "+datee.getHours()+":"+datee.getMinutes()),DeadlineDate:req.body.date})
          const user=await User.findById(resss.Request_id)
          Mail.DeadlineExtended(user.Email,req.body.type,req.body.round,datee)

              
          
        console.log("R1")
        }
        if(req.body.round=="Round2"){
          const obj={Quiz:old.Round2.Quiz,Assignment:old.Round2.Assignment,Deadline:datee}
         // await LabContents.findByIdAndUpdate(old._id,{Round2:obj})
          const resss=await LabReq.findByIdAndUpdate(req.body._id,{pending:false,Deadline:(datee.getDate()+"/"+(datee.getMonth()+1)+"/"+datee.getFullYear()+" "+datee.getHours()+":"+datee.getMinutes()),DeadlineDate:req.body.date})
          const user=await User.findById(resss.Request_id)
          Mail.DeadlineExtended(user.Email,req.body.type,req.body.round,datee)
        }
      }
      else if(req.body.type=="Theory"){
        console.log("theo")
        const old = await TheoryContents.findOne({});        
        console.log("old")
        const datee=new Date(req.body.date)
        console.log("datee")
        console.log("date",datee)
        if(req.body.round=="Round1"){
          console.log("R1")
          const obj={Quiz:old.Round1.Quiz,Assignment:old.Round1.Assignment,Deadline:datee}
         // await TheoryContents.findByIdAndUpdate(old._id,{Round1:obj})
          const resss=await TheoryReq.findByIdAndUpdate(req.body._id,{pending:false,Deadline:(datee.getDate()+"/"+(datee.getMonth()+1)+"/"+datee.getFullYear()+" "+datee.getHours()+":"+datee.getMinutes()),DeadlineDate:req.body.date})
          const user=await User.findById(resss.Request_id)
          Mail.DeadlineExtended(user.Email,req.body.type,req.body.round,datee)
          console.log("R11")
        }
        if(req.body.round=="Round2"){
          const obj={Quiz:old.Round2.Quiz,Assignment:old.Round2.Assignment,Deadline:datee}
         // await TheoryContents.findByIdAndUpdate(old._id,{Round2:obj})
          const resss=await TheoryReq.findByIdAndUpdate(req.body._id,{pending:false,Deadline:(datee.getDate()+"/"+(datee.getMonth()+1)+"/"+datee.getFullYear()+" "+datee.getHours()+":"+datee.getMinutes()),DeadlineDate:req.body.date})
          const user=await User.findById(resss.Request_id)
          Mail.DeadlineExtended(user.Email,req.body.type,req.body.round,datee)
        }
        console.log("R1sasd")
        await res.status(200).json({message:"success"});

      }
      /*const aa = await LabReq.find({}).populate("Request_id");
      const bb=await TheoryReq.find({}).populate("Request_id");
      console.log("aa", aa);*/
    } catch (err) {
      console.log(err);
    }
  };

  module.exports.adddate = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");
      console.log("req.dataaa",req.body)
      if(req.body.type=="Lab"){
        const old = await LabContents.findOne({});        
        const datee=new Date(req.body.date)
        console.log("date",datee)
        if(req.body.round=="Round1"){
          const obj={Quiz:old.Round1.Quiz,Assignment:old.Round1.Assignment,Deadline:datee}
          await LabContents.findByIdAndUpdate(old._id,{Round1:obj})
          const USER=await User.find({})
          USER.map((i)=>{
            i.Roles.map((item)=>{
              if(item=="Faculty"){
                Mail.CourseDeadlines(i.Email,req.body.type,req.body.round,datee)
              }
            })
          })
        }
        if(req.body.round=="Round2"){
          const obj={Quiz:old.Round2.Quiz,Assignment:old.Round2.Assignment,Deadline:datee}
          await LabContents.findByIdAndUpdate(old._id,{Round2:obj})
          const USER=await User.find({})
          USER.map((i)=>{
            i.Roles.map((item)=>{
              if(item=="Faculty"){
                Mail.CourseDeadlines(i.Email,req.body.type,req.body.round,datee)

              }
            })
          })
        }
      }
      else if(req.body.type=="Theory"){
        console.log("Theo")
        const old = await TheoryContents.findOne({});        
        const datee=new Date(req.body.date)
        console.log("date",datee)
        if(req.body.round=="Round1"){
          console.log("R1")
          const obj={Quiz:old.Round1.Quiz,Assignment:old.Round1.Assignment,Deadline:datee}
          await TheoryContents.findByIdAndUpdate(old._id,{Round1:obj})
          const USER=await User.find({})
          USER.map((i)=>{
            i.Roles.map((item)=>{
              if(item=="Faculty"){
                Mail.CourseDeadlines(i.Email,req.body.type,req.body.round,datee)

              }
            })
          })
          console.log("R111")
        }
        if(req.body.round=="Round2"){
          const obj={Quiz:old.Round2.Quiz,Assignment:old.Round2.Assignment,Deadline:datee}
          await TheoryContents.findByIdAndUpdate(old._id,{Round2:obj})
          const USER=await User.find({})
          USER.map((i)=>{
            i.Roles.map((item)=>{
              if(item=="Faculty"){
                Mail.CourseDeadlines(i.Email,req.body.type,req.body.round,datee)

              }
            })
          })
        }
        console.log("sucss")
        await res.status(200).json({message:"success"});

      }
      /*const aa = await LabReq.find({}).populate("Request_id");
      const bb=await TheoryReq.find({}).populate("Request_id");
      console.log("aa", aa);*/
    } catch (err) {
      console.log(err);
    }
  };

  module.exports.Folders = async (req, res) => {
    try {
      console.log(req.user)
      if (!req.user) return await res.json("Timed Out");
      try {      
        console.log("user",req.user._id)
        const user = await Folders.find({}).
        populate("Course User Evaluator")
        console.log("Folders",user)
        await res.status(200).json(user)
        } catch (err) {
          console.log(err);
          await res.status(400).json("error")    
        }  
    } catch (err) {
      console.log(err);
    }
  };
