var BTLDicdoc = require("../../../Models/SOBTL/BTLDictionary");

module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const BTL = await BTLDicdoc.create(req.body);
    console.log("BTL added", BTL);
    await res.json(BTL);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Showall = async (req, res) => {
  try {
    console.log(req.user)
    if (!req.user) return await res.json("Timed Out");
    const BTL = await BTLDicdoc.find({})
    console.log("all BTLs", BTL);
    await res.json(BTL);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowOne = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const BTL = await BTLDicdoc.findById(req.params.id)
    console.log(BTL)
    res.json(BTL);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Delete = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const BTL = await BTLDicdoc.deleteOne({ _id: req.params.id });
    console.log("all BTLs", BTL);  
    await res.json(BTL);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Update = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const BTL = await BTLDicdoc.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    console.log("all BTLs", BTL);
    await res.json(BTL);
  } catch (err) {
    console.log(err);
  }
};