var BTLdoc = require("../../../Models/SOBTL/BTL");

module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const BTL = await BTLdoc.create(req.body);
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
    const BTL = await BTLdoc.find({})
    console.log("all BTLs", BTL);
    await res.json(BTL);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowOne = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const BTL = await BTLdoc.findById(req.params.id)
    console.log(BTL)
    res.json(BTL);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Delete = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const BTL = await BTLdoc.deleteOne({ _id: req.params.id });
    const BTLs = await BTLdoc.find({})
    var num=0
    console.log("all BTLs", BTLs);  
    if(BTLs.length>0){
    BTLs.forEach((async(i)=>{
        num=num+1    
        await BTLdoc.findOneAndUpdate(
            { _id: i._id },
            {Number:num}
            )    
    }))}
    console.log("all BTLs", BTL);  
    await res.json(BTL);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Update = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const BTL = await BTLdoc.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    console.log("all BTLs", BTL);
    await res.json(BTL);
  } catch (err) {
    console.log(err);
  }
};