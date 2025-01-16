import User from "../models/userModel.mjs";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
 
import { errorHandler } from "../utils/error.mjs";

export const getUsers=async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
      }
}
    export const adminsearch= async (req, res) => {
    try {
      const { sename } = req.query;
      const users = await User.find({ username: { $regex: sename, $options: "i" } });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error searching users", error });
    }
  }
  
  export const admindelete=async (req, res) => {
    try {
      const { id } = req.query;
      await User.findByIdAndDelete(id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  }
  
  export const addUser= async (req,res)=>{
        try {
            console.log("reached")
            const { username, email, password } = req.body;
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
  }
  export const getuserDetails = async (req, res) => {
    try {
        console.log("Reached getUserDetails");
        const { id } = req.params;  // Extract id from request params

        const existingUser = await User.findById(id);  // Use findById instead of findOne
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });  // 404 for not found
        }

        return res.status(200).json(existingUser); // 200 for successful retrieval
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Internal Server Error" }); // 500 for server error
    }
};

export const updateUserDetails = async (req, res, next) => {
    try {
      const { username, email } = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: { username, email } },
        
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  };
  

//   export const adminSignin = (req, res) => {
//     const { email, password } = req.body;
  
//     // 🔐 Predefined Admin Credentials
//     const ADMIN_EMAIL = "admin123@gmail.com";
//     const ADMIN_PASSWORD = "admin@123"; // Ideally, store hashed passwords in a DB.
  
//     if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
//       return res.status(200).json({ success: true, message: "Admin logged in successfully" });
//     } else {
//       return res.status(401).json({ success: false, message: "Invalid admin credentials" });
//     }
//   };
  

//   export const adminlogout = (req, res) => {
    
//   };

// Optional: If you are using hashed passwords

export const adminSignin = (req, res) => {
  const { email, password } = req.body;

  // 🔐 Predefined Admin Credentials
  const ADMIN_EMAIL = "admin123@gmail.com";
  const ADMIN_PASSWORD = "admin@123"; // Ideally, store hashed passwords in a DB

  // Check if provided credentials match predefined ones
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Create a JWT token for admin
    const token = jwt.sign({ email: ADMIN_EMAIL, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the JWT token in the cookie
    const expiryDate = new Date(Date.now() + 3600000);  // Token expiry of 1 hour
    res.cookie('admin_token', token, { httpOnly: true, expires: expiryDate });

    return res.status(200).json({ success: true, message: "Admin logged in successfully" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid admin credentials" });
  }
};

  
export const adminLogout = (req, res) => {
    console.log("me")
    // Clear the admin token from cookies
    res.clearCookie('admin_token').status(200).json({ success: true, message: "Admin logged out successfully" });
  };
  