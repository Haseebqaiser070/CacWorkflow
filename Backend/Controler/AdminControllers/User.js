var Userdoc = require("../../Models/User");
var bcrypt = require("bcrypt");
const Mail = require("../../helpers/mailing");

module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin"))
      return res.status(401).json("Unautherized");
    var decodePass = req.body.Password;

    const newPassword = await bcrypt.hash(req.body.Password, 12);
    req.body.Password = newPassword;
    console.log(req.body);

    const oldUser = await Userdoc.findOne({ Email: req.body.Email });
    if (oldUser) return await res.status(409).json("Email");
    const oldUser2 = await Userdoc.findOne({ Phone: req.body.Phone });
    if (oldUser2) return await res.status(409).json("Phone");
    const User = await Userdoc.create(req.body);
    console.log("User added", User);
    Mail.signupMail(req.body.Email, decodePass);

    await res.status(201).json(User);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Showall = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin"))
      return res.status(401).json("Unautherized");
    const User = await Userdoc.find({});
    console.log("all User", User);
    await res.status(200).json(User);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Delete = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin"))
      return res.status(401).json("Unautherized");
    const User = await Userdoc.deleteOne({ _id: req.params.id });
    console.log("deleteuser", User);
    await res.status(201).json(User);
  } catch (err) {
    console.log(err);
  }
};

module.exports.getRole = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin"))
      return res.status(401).json("Unautherized");
    const Users = await Userdoc.find({});
    const RoleUsers = Users.filter((user) => {
      if (user?.Roles?.includes(req.params.Role)) return user;
    });
    console.log(RoleUsers);
    res.status(200).json(RoleUsers);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowOne = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin"))
      return res.status(401).json("Unautherized");
    const User = await Userdoc.findById(req.params.id);
    res.status(200).json(User);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Update = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin"))
      return res.status(401).json("Unautherized");
    const User = await Userdoc.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    await res.status(201).json(User);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Update2 = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin"))
      return res.status(401).json("Unautherized");
    const oldUser = await Userdoc.findById(req.params.id);
    if (req.body.Password == "oldPassword") {
      req.body.Password = oldUser.Password;
    } else {
      const newPassword = await bcrypt.hash(req.body.Password, 12);
      req.body.Password = newPassword;
    }
    req.body.Activated = oldUser.Activated;
    req.body.CourseCreation = oldUser.CourseCreation;
    req.body.CourseCDF = oldUser.CourseCDF;
    req.body.CourseSyllabus = oldUser.CourseSyllabus;
    req.body.CourseFolders = oldUser.CourseFolders;
    req.body.EvaluateFolders = oldUser.EvaluateFolders;
    const User = await Userdoc.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    await res.status(201).json(User);
  } catch (err) {
    console.log(err);
  }
};
