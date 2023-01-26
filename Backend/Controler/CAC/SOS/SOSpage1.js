var SOSPage1 = require("../../../Models/SOSModels/SOSFirstPage");

module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");   
    const retnSOSPage1 = await SOSPage1.create(req.body);
    console.log("SOSPage1 added", retnSOSPage1);
    await res.status(201).json(retnSOSPage1);
  } catch (err) {
    console.log(err);
  }
};
module.exports.ShowOne = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");   
    const SOSPage1 = await SOSPage1.findById(req.params.id)
    console.log(SOSPage1)
    res.status(200).json(SOSPage1);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Delete = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const SOSPage1 = await SOSPage1.deleteOne({ _id: req.params.id });
    console.log("all SOSPage1s", SOSPage1);
    await res.json(SOSPage1);
  } catch (err) {
    console.log(err);
  }
};
