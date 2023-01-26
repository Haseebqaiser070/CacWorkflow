var Program = require("../../Models/Program");
var Mail=require("../../helpers/mailing")
module.exports.Reminder = async (req, res) => {
  try {
    Mail.MeetingReminder(req.body.email)
    await res.status(201).json("Reminder Sent");
  } catch (err) {
    console.log(err);
  }
};

module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");   
    // const pre = await Program.findOne({Degree:req.body.Degree,Program:req.body.Program});
    // if(pre)return await res.json("Already Exists");
    const program = await Program.create(req.body);
    console.log("program added", program);
    await res.status(201).json(program);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Showall = async (req, res) => {
  try {
    console.log(req.user)
    if (!req.user) return await res.status(401).json("Timed Out");
    if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");   
    const program = await Program.find({});
    console.log("all programs", program);
    await res.status(200).json(program);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowallPrefix = async (req, res) => {
  try {
    console.log(req.user)
    if (!req.user) return await res.status(401).json("Timed Out");
    if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");   
    const program = await Program.find({});
    var pre = []
    program.forEach((e) => {
      if(!pre.includes(e.Degree))pre.push(e.Degree)
    });
    console.log("all pre", pre);
    await res.status(200).json(pre);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Showallwithdegree = async (req, res) => {
  try {
    console.log(req.user)
    if (!req.user) return await res.status(401).json("Timed Out");
    if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");   
    const programs = await Program.find({Degree:req.params.Degree});
    console.log("all pre", programs);
    await res.status(200).json(programs);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowOne = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");   
    const program = await Program.findById(req.params.id)
    console.log(program)
    res.status(200).json(program);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Delete = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const program = await Program.deleteOne({ _id: req.params.id });
    console.log("all programs", program);
    await res.json(program);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Update = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out"); 
    if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");   
    // const pre = await Program.findOne({Degree:req.body.Degree,Program:req.body.Program});
    // if(pre)return await res.json("Already Exists");
    
    const program = await Program.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    console.log("all programs", program);
    await res.json(program);
  } catch (err) {
    console.log(err);
  }
};
