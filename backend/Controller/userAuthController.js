import User from "../model/user.js"
import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating tokens



export const userRegister = async (req, res) => 
{
    const { name, email, password } = req.body;
    try 
    {
        const existingUser = await User.findOne({ email });
        if (existingUser) 
        {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ success: true, message: 'Registration successful', user: { id: newUser._id, email: newUser.email, name: newUser.name } });
    } 
    catch (error) 
    {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
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
          res.status(409).json("exists"); // Use more specific status code
        } else {
          res.json("notexist");
          // Add user creation logic if applicable
        }
      } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
      }
    };
