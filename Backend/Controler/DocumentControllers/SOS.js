// var SOSdoc = require("../../Models/SOS");

// module.exports.Add = async (req, res) => {
//   try {
//     if (!req.user) return await res.json("Timed Out");
//     const SOS = await SOSdoc.create(req.body);
//     console.log("SOS added", SOS);
//     await res.json(SOS);
//   } catch (err) {
//     console.log(err);
//   }
// };
// module.exports.Showall = async (req, res) => {
//   try {
//     console.log(req.user)
//     if (!req.user) return await res.json("Timed Out");
//     const SOS = await SOSdoc.find({});
//     console.log("all SOSs", SOS);
//     await res.json(SOS);
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports.ShowOne = async (req, res) => {
//   try {
//     if (!req.user) return await res.json("Timed Out");
//     const SOS = await SOSdoc.findById(req.params.id).populate('Selected')
//     .populate({path: 'Selected', model: 'Category',populate:{path:'EnteredCourse',model:'Course'}})
//     .populate({path: 'Selected', model: 'Category',populate:{path:'EnteredCourse',model:'Course',populate:{path:'PreRequisites',model:'Course'}}})
//     console.log(SOS)
//     res.json(SOS);
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports.Delete = async (req, res) => {
//   try {
//     if (!req.user) return await res.json("Timed Out");
//     const SOS = await SOSdoc.deleteOne({ _id: req.params.id });
//     console.log("all SOSs", SOS);
//     await res.json(SOS);
//   } catch (err) {
//     console.log(err);
//   }
// };
// module.exports.Update = async (req, res) => {
//   try {
//     if (!req.user) return await res.json("Timed Out");
//     const SOS = await SOSdoc.findOneAndUpdate(
//       { _id: req.params.id },
//       req.body
//     );
//     console.log("all SOSs", SOS);
//     await res.json(SOS);
//   } catch (err) {
//     console.log(err);
//   }
// };
