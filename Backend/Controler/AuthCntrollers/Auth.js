var User = require("../../Models/User");
var bcrypt = require("bcrypt");
var { createjwts } = require("../../Utils/JWTs");
var Token=require("../../Models/token")
const resetPasswordMail = require("../../helpers/mailing");
const randToken = require("rand-token");
module.exports.registerAdmin = async (req, res) => {
  try {
    const { Name, Email, Password, Phone } = req.body;
    let old = await User.findOne({ Email });
    if (old) {
      res.status(401).json("already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(Password, salt);
    const newu = await User.create({
      Name,
      Email,
      Phone,
      Password: hashPassword,
      Roles: ["Admin"],
    });
    res.status(201).json(newu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports.Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ Email });
    if (!user) return res.status(404).json("is not a User");
    if(!user.Activated)return res.status(401).json("Deactivated");
    const match = await bcrypt.compare(Password, user.Password);
    if (!match) return res.status(401).json("wrong password");
    const AccessTokens = createjwts(user, "Access key", "10s");
    const RefreshTokens = createjwts(user, "Refersh Key", "10m");
    res.cookie("AccessTokens", AccessTokens, {
      MaxAge: 600000,
      httpOnly: true,
    });
    res.cookie("RefreshTokens", RefreshTokens, {
      MaxAge: 600000,
      httpOnly: true,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.forgotpassword=async (req, res) => {
  console.log("fasf",req.body)
  User.findOne({ Email: req.body.Email })
    .then(async (user) => {
      console.log("user",user)
      const token = randToken.generate(16);
      await Token.create({ token: token, email: user.Email });
      resetPasswordMail.resetPasswordMail(user.Email, token);
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        success: true,
        message: "Password reset link sent to your email",
      });
    })
    .catch((err) => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ success: false, message: "User Not Found" });
    });
};
module.exports.Check = async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json("not login");
  res.status(200).json(user);
};
module.exports.getUserWhole = async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json("not login");
  let us = await User.findOne({Email:user.Email});
  res.status(200).json(us);
};

module.exports.resetpassword= async (req, res) => {
  console.log("Token", req.params.token);
  console.log("password", req.body);
  const salt = await bcrypt.genSalt(10);
  console.log("ada",req.body.password)
  const hashPassword =await  bcrypt.hash(req.body.password, salt);
  Token.findOne({ token: req.params.token })
    .then(async (token) => {
      if (!token ) { 
        console.log("fs")
        res.setHeader("Content-Type", "application/json");
        res
          .status(500)
          .json({ success: false, message: "Link has been expired" });
      }
      else{
      console.log("token",token)
      User.findOne({ Email: token.email }, (err, user) => {
        console.log("hello1",user)
        if (err) {
          res.setHeader("Content-Type", "application/json");
          res
            .status(500)
            .json({ success: false, message: "Link has been expired" });
        }
        
          User.updateOne(
            { _id: user._id },
            { Password:hashPassword },
            (err, result) => {
              console.log("hello3",result)

              if (err) {
                res.setHeader("Content-Type", "application/json");
                res
                  .status(500)
                  .json({ success: false, message: "Link has been expired" });
              } else {
                res.setHeader("Content-Type", "application/json");
                res
                  .status(200)
                  .json({ success: true, message: "Password Updated" });
              }
            }
          );
        
      });
    }
    })
    
};


module.exports.resetPassword= async (req, res) => {
  console.log("password", req.body);
  const salt = await bcrypt.genSalt(10);
  console.log("ada",req.body.password)
  const hashPassword =await  bcrypt.hash(req.body.password, salt);
      User.findOne({ Email: req.body.email }, (err, user) => {
        console.log("hello1",user)
        if (err) {
          res.setHeader("Content-Type", "application/json");
          res
            .status(500)
            .json({ success: false, message: "Link has been expired" });
        }
        
          User.updateOne(
            { _id: user._id },
            { Password:hashPassword },
            (err, result) => {
              console.log("hello3",result)

              if (err) {
                res.setHeader("Content-Type", "application/json");
                res
                  .status(500)
                  .json({ success: false, message: "Link has been expired" });
              } else {
                res.setHeader("Content-Type", "application/json");
                res
                  .status(200)
                  .json({ success: true, message: "Password Updated" });
              }
            }
          );
        
      });
    
    
    
};
module.exports.Logout = async (req, res) => {
  res.cookie("AccessTokens", "", {
    MaxAge: 0,
    httpOnly: true,
  });
  res.cookie("RefreshTokens", "", {
    MaxAge: 0,
    httpOnly: true,
  });
  res.json("logged out");
};
