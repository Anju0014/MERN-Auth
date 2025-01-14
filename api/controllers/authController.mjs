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

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // 🛑 Check if required fields are present
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔎 Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" }); // 409 Conflict
    }

    // 🔒 Hash the password (Using async method)
    const hashedPassword = await bcryptjs.hash(password, 10);

    // 🆕 Create a new user instance
    const newUser = new User({ username, email, password: hashedPassword });

    // 💾 Save to the database
    await newUser.save();

    // ✅ Respond with success
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error); // Pass to error handling middleware
  }
};
