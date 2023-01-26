var Domaindoc = require("../../../Models/SOBTL/Domain");

module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const Domain = await Domaindoc.create(req.body);
    console.log("Domain added", Domain);
    await res.json(Domain);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Showall = async (req, res) => {
  try {
    console.log(req.user)
    if (!req.user) return await res.json("Timed Out");
    const Domain = await Domaindoc.find({})
    console.log("all Domains", Domain);
    await res.json(Domain);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowOne = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const Domain = await Domaindoc.findById(req.params.id)
    console.log(Domain)
    res.json(Domain);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Delete = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const Domain = await Domaindoc.deleteOne({ _id: req.params.id });    
    console.log("all Domains", Domain);  
    await res.json(Domain);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Update = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const Domain = await Domaindoc.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    console.log("all Domains", Domain);
    await res.json(Domain);
  } catch (err) {
    console.log(err);
  }
};