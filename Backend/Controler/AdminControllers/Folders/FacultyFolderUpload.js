var Folderdoc = require("../../../Models/Folders");
var Base64doc = require("../../../Models/Base64");
var Courses=require("../../../Models/CourseModels/ProgramWiseCourses")
var Mail=require("../../../helpers/mailing")
var User=require("../../../Models/User")
module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Faculty")) return await res.status(401).json("UnAutherized");
    const old = await Folderdoc.findById(req.params.id)    
    const isalready = old.files.find(obj => {
        return obj.Title === req.body.Title
      })
      console.log("isalready",isalready)
      console.log("dsds",req.body)
    if(isalready!=undefined){
        const fils =await Promise.all( old.files.map(async(x)=>{
          if(x.Title==req.body.Title){            

            await Base64doc.deleteOne({_id:x.Question.Base64})
            await Base64doc.deleteOne({_id:x.Solution.Base64})
            await Base64doc.deleteOne({_id:x.Awardlist.Base64})
            await Base64doc.deleteOne({_id:x.Best.Base64})
            await Base64doc.deleteOne({_id:x.Average.Base64})
            await Base64doc.deleteOne({_id:x.Worst.Base64})
                    
            req.body.Question.Base64 = await Base64doc.create({pdf:req.body.Question.Base64})
            req.body.Solution.Base64 = await Base64doc.create({pdf:req.body.Solution.Base64})
            req.body.Awardlist.Base64 = await Base64doc.create({pdf:req.body.Awardlist.Base64})
            req.body.Best.Base64 = await Base64doc.create({pdf:req.body.Best.Base64})
            req.body.Average.Base64 = await Base64doc.create({pdf:req.body.Average.Base64})
            req.body.Worst.Base64 = await Base64doc.create({pdf:req.body.Worst.Base64})     
                         
            return({
                    Title:req.body.Title,
                    Question:req.body.Question,
                    Solution:req.body.Solution,
                    Awardlist:req.body.Awardlist,
                    Best:req.body.Best,
                    Average:req.body.Average,
                    Worst:req.body.Worst
                })

            }
            else{
                return x
            }
        }))
        old.files=fils
    }
    else{
          req.body.Question.Base64 = await Base64doc.create({pdf:req.body.Question.Base64})
          req.body.Solution.Base64 = await Base64doc.create({pdf:req.body.Solution.Base64})
          req.body.Awardlist.Base64 = await Base64doc.create({pdf:req.body.Awardlist.Base64})
          req.body.Best.Base64 = await Base64doc.create({pdf:req.body.Best.Base64})
          req.body.Average.Base64 = await Base64doc.create({pdf:req.body.Average.Base64})
          req.body.Worst.Base64 = await Base64doc.create({pdf:req.body.Worst.Base64})            
        const obj = {
            Title:req.body.Title,
            Question:req.body.Question,
            Solution:req.body.Solution,
            Awardlist:req.body.Awardlist,
            Best:req.body.Best,
            Average:req.body.Average,
            Worst:req.body.Worst
        }
        old.files.push(obj)
    }
    
    console.log("old",old)
    const up = await Folderdoc.findOneAndUpdate({_id:req.params.id},old);
    console.log("Folders",up)
    await res.status(201).json(up);
  } catch (err) {
    console.log(err);
  }
};

module.exports.SubmitaRound = async (req, res) => {
    
    try {
        console.log(req.user)
        if (!req.user) return await res.json("Timed Out");
        if (!req.user.Roles.includes("Faculty")) return await res.status(401).json("UnAutherized");
        try {       
          console.log("req.body.Round",req.body.Round) 
          if(req.body.Round=="Round1"){  
          const up = await Folderdoc.findOneAndUpdate({_id:req.params.id},{Round1:true});
          console.log("CourseFolder",up)
          const course=await Courses.findById(up.Course)
          const user=await User.find({})
          const userr=await User.findById(up.User)

          user.map((item)=>{
      
            item.Roles.map((i)=>{
              if(i=="Admin"){
                Mail.FolderSubmit(user.Email,userr.Name,course.Name+" - "+course.Code)
              }
            })
          })
          await res.status(200).json(up)
        }
        else if(req.body.Round=="Round2"){  
            const up = await Folderdoc.findOneAndUpdate({_id:req.params.id},{Round2:true});
            console.log("CourseFolder",up)
            await res.status(200).json(up)
          }
        }catch (err) {
            console.log(err);
            await res.status(400).json("error")    
        }  
      } catch (err) {
        console.log(err);
      }    
}


module.exports.SubmitaRoundRevision = async (req, res) => {
    
  try {
      console.log(req.user)
      if (!req.user) return await res.json("Timed Out");
      if (!req.user.Roles.includes("Faculty")) return await res.status(401).json("UnAutherized");
      try {       
        
        const up = await Folderdoc.findOneAndUpdate({_id:req.params.id},{Revision:true});
        console.log("CourseFolder",up)
        const course=await Courses.findById(up.Course)
        const user=await User.find({})
        const userr=await User.findById(up.User)

        user.map((item)=>{
    
          item.Roles.map((i)=>{
            if(i=="Admin"){
              Mail.FolderSubmit(user.Email,userr.Name,course.Name+" - "+course.Code)
            }
          })
        })
        await res.status(200).json(up)
      
      
      }catch (err) {
          console.log(err);
          await res.status(400).json("error")    
      }  
    } catch (err) {
      console.log(err);
    }    
}
module.exports.ICEFSubimt = async (req, res) => {
    
    try {
        console.log(req.user)
        if (!req.user) return await res.json("Timed Out");
        if (!req.user.Roles.includes("Faculty")) return await res.status(401).json("UnAutherized");
        try {                   
          const old = await Folderdoc.findById(req.params.id)    
          if(old.ICEF!=null){
            var r = await Base64doc.deleteOne({_id:old.ICEF})
            console.log("deleted",r)
          }
          const II = await Base64doc.create({pdf:req.body.ICEF})            
          
          const up = await Folderdoc.findOneAndUpdate({_id:req.params.id},{ICEF:II});
            console.log("CourseFolder",up)
            await res.status(200).json(up)
        }catch (err) {
            console.log(err);
            await res.status(400).json("error")    
        }  
      } catch (err) {
        console.log(err);
      }    
}

module.exports.ObeSubimt = async (req, res) => {
    
    try {
        console.log(req.user)
        if (!req.user) return await res.json("Timed Out");
        if (!req.user.Roles.includes("Faculty")) return await res.status(401).json("UnAutherized");        
        try {        
          const old = await Folderdoc.findById(req.params.id)               
          if(old.Obe!=null){
            var r = await Base64doc.deleteOne({_id:old.Obe})
            console.log("erwefz",r)
          }
          const II = await Base64doc.create({pdf:req.body.Obe})            
            
          const up = await Folderdoc.findOneAndUpdate({_id:req.params.id},{Obe:II});
            console.log("CourseFolder",up)
            await res.status(200).json(up)
        }catch (err) {
            console.log(err);
            await res.status(400).json("error")    
        }  
      } catch (err) {
        console.log(err);
      }    
}
module.exports.LecSubimt = async (req, res) => {
    
  try {
      console.log(req.user)
      if (!req.user) return await res.json("Timed Out");
      if (!req.user.Roles.includes("Faculty")) return await res.status(401).json("UnAutherized");        
      try {        
        const old = await Folderdoc.findById(req.params.id)               
        if(old.LectureDeliveryRecord!=null){
          var r = await Base64doc.deleteOne({_id:old.LectureDeliveryRecord})
          console.log("erwefz",r)
        }
        const II = await Base64doc.create({pdf:req.body.LectureDeliveryRecord})            
          
        const up = await Folderdoc.findOneAndUpdate({_id:req.params.id},{LectureDeliveryRecord:II});
          console.log("CourseFolder",up)
          await res.status(200).json(up)
      }catch (err) {
          console.log(err);
          await res.status(400).json("error")    
      }  
    } catch (err) {
      console.log(err);
    }    
}

module.exports.addEvaluation = async (req, res) => {
    
  try {
      console.log(req.params.id)
      if (!req.user) return await res.json("Timed Out");
      if (!req.user.Roles.includes("Evaluator")) return await res.status(401).json("UnAutherized");        
      try {        
        const old = await Folderdoc.findById(req.params.id)               
        const data=req.body           
        
          console.log("dejj",old)
         var a
         old?.Evaluation?.map((item,index)=>{
          if(item.title==req.body.title){
            a=item
          }
         })
         console.log("hello",a)
         console.log("hello req body",data)

          var b=old?.Evaluation
        if(a==undefined){
         // b=[]
          b.push(req.body.data)
          console.log("arrayeb",b)
          const up = await Folderdoc.findOneAndUpdate({_id:req.params.id},{Evaluation:b,Evaluator:req.user._id});
          console.log("evahks",up)
          await res.status(200).json(up)
        }
        else{
          b.map((item,index)=>{
            console.log("i am here")

            if(item.title==req.body.title){
              console.log("i sm here")
              b[index]=req.body.data
            }
          })
          console.log("hellooldevaluation",b)
          const up = await Folderdoc.findOneAndUpdate({_id:req.params.id},{Evaluation:b,Evaluator:req.user._id});
          await res.status(200).json(up)
        }
          
        
      }catch (err) {
          console.log(err);
          await res.status(400).json("error")    
      }  
    } catch (err) {
      console.log(err);
    }    
}

module.exports.editEvaluation = async (req, res) => {
    
  try {
      console.log(req.params.id)
      if (!req.user) return await res.json("Timed Out");
      if (!req.user.Roles.includes("Evaluator")) return await res.status(401).json("UnAutherized");        
      try {        
        const old = await Folderdoc.findByIdAndUpdate(req.params.id,{Evaluated:true})               
        const userr=await User.findById(old.User)
        const course=await Courses.findById(old.Course)

        Mail.FolderEvaluated(userr.Email,course.Name+" - "+course.Code)
         console.log("CourseFolder",old)
        await res.status(200).json(old)
        
      }catch (err) {
          console.log(err);
          await res.status(400).json("error")    
      }  
    } catch (err) {
      console.log(err);
    }    
}
module.exports.editRevisionEvaluation = async (req, res) => {
    
  try {
      console.log(req.params.id)
      if (!req.user) return await res.json("Timed Out");
      if (!req.user.Roles.includes("Evaluator")) return await res.status(401).json("UnAutherized");        
      try {        
        const oldd = await Folderdoc.findByIdAndUpdate(req.params.id,{Revision:false,Evaluated:true})               
        const old = await Folderdoc.findByIdAndUpdate(req.params.id,{WantRevision:false,Evaluated:true})   
        const userr=await User.findById(old.User)
        const course=await Courses.findById(old.Course)

        Mail.FolderEvaluated(userr.Email,course.Name+" - "+course.Code)
         console.log("CourseFolderrr",old)
        await res.status(200).json(old)
        
      }catch (err) {
          console.log(err);
          await res.status(400).json("error")    
      }  
    } catch (err) {
      console.log(err);
    }    
}
module.exports.editRevision = async (req, res) => {
    
  try {
      console.log(req.params.id)
      if (!req.user) return await res.json("Timed Out");
      if (!req.user.Roles.includes("Evaluator")) return await res.status(401).json("UnAutherized");        
      try {        
        const old = await Folderdoc.findByIdAndUpdate(req.params.id,{WantRevision:true})               
        const userr=await User.findById(old.User)
        const course=await Courses.findById(old.Course)

        Mail.FolderRevision(userr.Email,course.Name+" - "+course.Code)
         console.log("CourseFolder",old)
        await res.status(200).json(old)
        
      }catch (err) {
          console.log(err);
          await res.status(400).json("error")    
      }  
    } catch (err) {
      console.log(err);
    }    
}
module.exports.showOne = async (req, res) => {
    
    try {
        console.log(req.user)
        if (!req.user) return await res.json("Timed Out");
        try {        
          const Folder = await Folderdoc.findById(req.params.id)
          console.log("CourseFolder",Folder)
          await res.status(200).json(Folder)
          } catch (err) {
            console.log(err);
            await res.status(400).json("error")    
          }  
      } catch (err) {
        console.log(err);
      }    

}

module.exports.showfiles = async (req, res) => {
    
  try {
      console.log(req.user)
      if (!req.user) return await res.json("Timed Out");
      try {        
        const Folder = await Folderdoc.findById(req.params.id).populate("files.Best.Base64 files.Worst.Base64 files.Average.Base64 files.Solution.Base64 files.Question.Base64 files.Awardlist.Base64")
        console.log("Course Folder",Folder.files)
        await res.status(200).json(Folder)
        } catch (err) {
          console.log(err);
          await res.status(400).json("error")    
        }  
    } catch (err) {
      console.log(err);
    }    

}