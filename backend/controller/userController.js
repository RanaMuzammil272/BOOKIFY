const asynchandler =require("express-async-handler");
const User =require("../models/usermodel");
const generateToken = require("../util/generateToken");
const authMiddleware = require("../middlewares/authMiddleware")

const registeruser =asynchandler(async(req,res)=>{
      const {name,email,password} =req.body;
      const userexist =await User.findOne({email});
      if(userexist){
        res.status(400);
        throw new Error("useralready exists");
      } 

      const  user =await User.create({
        name,
        email,
        password
      })

      if(user){
        res.status(201).json({
          _id:user._id,
          name:user.name,
          email:user.email,
          isAdmin:user.isAdmin
        });

      }
      else{
        res.status(400);
        throw new Error("user ben there");
      }
      
});

const authuser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchpassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports={registeruser , authuser};