// import User from "../models/userModel.mjs"
// import bcryptjs from 'bcryptjs';

// export const signup= async(req,res,next)=>{
//     const {username,email,password}=req.body;
//     const hashedPassword=bcryptjs.hashSync(password,10);

//     const newUser=new User({username,email,password:hashedPassword});
//     try{
//         await newUser.save()
//         res.status(201).json({message:'User created Successfully'})
//     } catch(error){
//         next(error)
//     }
    
// }

import User from "../models/userModel.mjs";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.mjs";
import jwt from 'jsonwebtoken'


export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" }); // 409 Conflict
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error); 
  }
};



export const signin=async (req,res,next)=>{
  const {email,password}=req.body;
  try{
    const validUser=await User.findOne({email});
    if(!validUser) return next(errorHandler(404,'User Not Found'));
    const validPassword=bcryptjs.compareSync(password,validUser.password);
    if(!validPassword) return next(errorHandler(404,'User Not Found'));
    const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)
    const { password:hashedPassword ,...rest}=validUser._doc
    const expiryDate=new Date(Date.now() +3600000)
    res.cookie('access_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(rest)

  }catch(error){
    next(error)
  }
}