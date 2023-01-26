var categorydoc = require("../../Models/Categories");

module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const category = await categorydoc.create(req.body);
    console.log("category added", category);
    await res.json(category);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Showall = async (req, res) => {
  try {
    console.log(req.user)
    if (!req.user) return await res.json("Timed Out");
    const category = await categorydoc.find({})
    console.log("all categorys", category);
    await res.json(category);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowOne = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const category = await categorydoc.findById(req.params.id)
    console.log(category)
    res.json(category);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Delete = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const category = await categorydoc.deleteOne({ _id: req.params.id });
    console.log("all categorys", category);
    await res.json(category);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Update = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const category = await categorydoc.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    console.log("all categorys", category);
    await res.json(category);
  } catch (err) {
    console.log(err);
  }
};
