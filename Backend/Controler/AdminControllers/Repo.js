var Repo = require("../../Models/RepoCourse");
var coursedoc = require("../../Models/CourseModels/Course");
var CDFdoc = require("../../Models/CDFModels/CDFGeneral");
var Syllabusdoc = require("../../Models/SyallabusModels/SyllabusGeneral");
const Task = require("../../Models/Tasks");
module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
    //Check weather Code already exist 
    // const Repos = await Repo.findOne({Code:req.body.Code});
    const courses = await coursedoc.findOne({Code:req.body.Code});
    if(courses)return await res.json("Already Exists Code");
    //Check weather Name already exist 
    const course = await coursedoc.findOne({Name:req.body.Name});
    // const Reps = await Repo.findOne({Name:req.body.Name});
    if(course)return await res.json("Already Exists Name");
    
    const repo = await Repo.create(req.body);
    console.log("Repo added", repo);
    await res.json(repo);
  } catch (err) {
    console.log(err);
  }
};

module.exports.availablecodes = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const Repos = await Repo.find({});
    var reps =Repos.map((i)=>{
      var nums1 = i.Code.split("-")[1]
      return parseInt(nums1)
    })
    var retn=[]
    for(var i=100;i<1000;i=i+1){
      if(!reps.includes(i))retn.push(i)
    }
    console.log("all retn", retn);
    await res.json(retn);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Showall = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const Repos = await Repo.find({});
    console.log("all Repos", Repos);
    await res.json(Repos);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Showall = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const Repos = await Repo.find({});
    console.log("all Repos", Repos);
    await res.json(Repos);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Showwithoutcat = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const Repos = await Repo.find({});
    const course = await coursedoc.find({});
    const reps = Repos.filter(i=>{
      var ab =  course.some(e=>e.Code==i.Code)
      if(!ab) return i
    })
    console.log("Available", reps);
    await res.json(reps);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Showallforcat = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const Repos = await Repo.find({});
    const course = await coursedoc.find({});
    const reps = Repos.filter(i=>{
      var ab =  course.some(e=>e.Code==i.Code)
      if(!ab) return i
    })
    var final = await Promise.all(reps.filter(async(i)=>{
      var task = await Task.findOne({taskType:"Create Catalog Description",Course:i._id})
      if(!task){
        return i
      }
    }))
    console.log("Available", final);
    await res.json(final);
  } catch (err) {
    console.log(err);
  }
};


module.exports.ShowforUpdateCatalogdesc= async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
    const course = await coursedoc.find({});
    const Repos = await Repo.find({});
    const reps = Repos.filter(i=>{
      return course.find(e=>{
          return(e.Code==i.Code)
      })
    })    
    var final = await Promise.all(reps.filter(async(i)=>{
      var task = await Task.findOne({taskType:"Update Catalog Description",Course:i._id})
      if(!task){
        return i
      }
    }))
    console.log("Available", final);
    await res.json(final);
  } catch (err) {
    console.log(err);
  }
};



module.exports.ShowforCreateCDF= async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
    const course = await coursedoc.find({});
    const Repos = await Repo.find({});
    const reps = Repos.filter(i=>{
      return course.find(e=>{
          return(e.Code==i.Code)
      })
    })
    const course2 = await CDFdoc.find({});
    const reps2 = reps.filter(i=>{
      var ab =  course2.some(e=>e.Code==i.Code)
      if(!ab) return i
    })    
    var final = await Promise.all(reps2.filter(async(i)=>{
      var task = await Task.findOne({taskType:"Create CDF",Course:i._id})
      if(!task){
        return i
      }
    }))
    console.log("Available", final);
    await res.json(final);
  } catch (err) {
    console.log(err);
  }
};



module.exports.ShowforUpdateCDF= async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
    const course = await CDFdoc.find({});
    const Repos = await Repo.find({});
    const reps = Repos.filter(i=>{
      return course.find(e=>{
          return(e.Code==i.Code)
      })
    })    
    var final = await Promise.all(reps.filter(async(i)=>{
      var task = await Task.findOne({taskType:"Update CDF",Course:i._id})
      if(!task){
        return i
      }
    }))
    console.log("Available", final);
    await res.json(final);
  } catch (err) {
  console.log(err);
  }
};




module.exports.ShowforCreateSyllabus= async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
    const course = await CDFdoc.find({});
    const Repos = await Repo.find({});
    const reps = Repos.filter(i=>{
      return course.find(e=>{
          return(e.Code==i.Code)
      })
    })
    const course2 = await Syllabusdoc.find({});
    const reps2 = reps.filter(i=>{
      var ab =  course2.some(e=>e.Code==i.Code)
      if(!ab) return i
    })    
    var final = await Promise.all(reps2.filter(async(i)=>{
      var task = await Task.findOne({taskType:"Create Syllabus",Course:i._id})
      if(!task){
        return i
      }
    }))
    console.log("Available", final);
    await res.json(final);
  } catch (err) {
  console.log(err);
  }
};

module.exports.ShowUpdateSyllabus= async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
    const course = await Syllabusdoc.find({});
    const Repos = await Repo.find({});
    const reps = Repos.filter(i=>{
      return course.find(e=>{
          return(e.Code==i.Code)
      })
    })        
    var final = await Promise.all(reps.filter(async(i)=>{
      var task = await Task.findOne({taskType:"Update Syllabus",Course:i._id})
      if(!task){
        return i
      }
    }))
    console.log("Available", final);
    await res.json(final);
  } catch (err) {
  console.log(err);
  }
};
  module.exports.ShowOne = async (req, res) => {
    try {
      if (!req.user) return await res.json("Timed Out");
      if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
      const Repo1 = await Repo.findById(req.params.id);
      console.log(Repo1)
      res.json(Repo1);
    } catch (err) {
      console.log(err);
    }
  };

  module.exports.Update = async (req, res) => {
    try {
      if (!req.user) return await res.json("Timed Out"); 
      if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");
      
      // const Repos = await Repo.findOne({Code:req.body.Code});
      // const courses = await coursedoc.findOne({Code:req.body.Code});
      // if(Repos||courses)return await res.json("Already Exists Code");
      
      //Check weather Name already exist 
      // const course = await coursedoc.findOne({Name:req.body.Name});
      // const Reps = await Repo.findOne({Name:req.body.Name});
      // if(Reps||course)return await res.json("Already Exists Name");
      
      const Re = await Repo.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      console.log("all programs", Re);
      await res.json(Re);
    } catch (err) {
      console.log(err);
    }
  };

  module.exports.Delete = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
      const repo = await Repo.deleteOne({ _id: req.params.id });
      console.log("all Repos", repo);
      await res.json(repo);
    } catch (err) {
      console.log(err);
    }
  };
