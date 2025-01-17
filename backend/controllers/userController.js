import User from "../models/userModel.js";
import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js";

const RegisterUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const newUser = await User.create({ name, email, password, pic });
    if (newUser) {
        res.status(201).json({_id:newUser._id,name:newUser.name,email:newUser.email,isAdmin: newUser.isAdmin,pic:newUser.pic})
    } else {
      res.status(400);
        throw new Error("user not created");
    }
});

const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await user.comparedPassword(password)) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token : generateToken(user._id)
    });
  }
  else{
    res.status(400)
    throw new Error("Inavalid email or password.User not Found");
  }
  
})

export { RegisterUser, LoginUser }