var SOdoc = require("../../../Models/SOBTL/SO");

module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const SO = await SOdoc.create(req.body);
    console.log("SO added", SO);
    await res.json(SO);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Showall = async (req, res) => {
  try {
    console.log(req.user)
    if (!req.user) return await res.json("Timed Out");
    const SO = await SOdoc.find({})
    console.log("all SOs", SO);
    await res.json(SO);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowOne = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const SO = await SOdoc.findById(req.params.id)
    console.log(SO)
    res.json(SO);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Delete = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const SO = await SOdoc.deleteOne({ _id: req.params.id });
    const SOs = await SOdoc.find({})
    console.log("ss",SOs)
    var num=0
    if(SOs.length>0){
    SOs.forEach((async(i)=>{
        num=num+1    
        await SOdoc.findOneAndUpdate(
            { _id: i._id },
            {Number:num}
            )    
    }))}
    console.log("all SOs", SO);
    await res.json(SO);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Update = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const SO = await SOdoc.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    console.log("all SOs", SO);
    await res.json(SO);
  } catch (err) {
    console.log(err);
  }
};