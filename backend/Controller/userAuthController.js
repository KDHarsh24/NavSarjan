import User from "../model/user.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // For generating tokens



export const userRegister = async (req, res) => 
{
  try {
    const { name, email, password, address, phone, dob } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Parse the dob string into a Date object with only date information

    // Create a new user object
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      dob, // Ensure only the date part is saved
    });

    // Save the new user
    const savedUser = await newUser.save();

    // Send success response
    res.status(201).json({ message: 'Account created successfully!', user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating account', error: error.message });
  }
}


export const userLogin=async(req,res)=>
{

    try {
        const { email, password } = req.body;
        // Validate user input (recommended)
        // ...
        const check = await User.findOne({ email: email });
        if (check) {
          res.status(200).json({
            success: true,
            data:check
          });
        } else {
          res.status(200).json({
            success: false,
            data:check
          });
        }
      } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
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