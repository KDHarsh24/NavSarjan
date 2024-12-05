import User from "../model/user.js"
import bcrypt from 'bcrypt';
import path from 'path';
import fs from 'fs';

export const userRegister = async (req, res) => {
  try {
    const { name, email, password, address, phone, dob, social } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      dob,
      image: req.file ? req.file.path : null,
      social: social || null,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'Account created successfully!', user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating account', error: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email });

    if (!user) {
      // If user is not found
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // Login successful
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          id: user._id,
          email: user.email,
          name: user.name, // assuming a "name" field exists in the User model
        },
      });
    } else {
      // Password mismatch
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



export const checkUser=async(req,res)=>
{
  try
  {
    const email=req.body.email;
    const queryResult=await User.findOne({email:email});
    console.log("result: "+JSON.stringify(queryResult,null,2));
    if(queryResult)
    {
      res.status(200).json({
        success:true,
        data:queryResult
      })
    }
    else
    {
      res.status(200).json({
        success:false,
        data:queryResult
      })
    }
  
  }
  catch(err)
  {
      res.status(500).json({ 
        error: "Internal server error" 
      });
  }
}

export const newUser=async(req,res)=>
{
  try
  {
    const {email,pass}=req.body;
    console.log("email: "+email+"  pass: "+pass);
   
    const newUser = new User({
      email: email,
      password: pass
    });
  
    // Save the user to the database
    const savedUser = await newUser.save();
    console.log("newUser:", savedUser);
  
    res.status(200).json({
      success: true,
      message: "Inserted successfully",
      data: savedUser
    });
  }
  catch(err)
  {
    res.status(500).json({ 
      error: "Internal server error" 
    });
  }

}