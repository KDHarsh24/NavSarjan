import User from "../model/user.js"
import bcrypt from 'bcrypt'; // For password hashing
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
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) 
    {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try 
    {
        // Find user by email
        const user = await User.findOne({ email });
        
        // If user does not exist
        if (!user) 
        {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
      
        // Compare the provided password with the stored (hashed) password
        const isMatch = await user.matchPassword(password);
      
        // If the passwords don't match
        if (!isMatch) 
        {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
      
        // If successful, generate a JWT token (you can replace this with your JWT generation logic)
        const token = 'your-jwt-token-here'; // For example, using jsonwebtoken library to generate a token
      
        res.status(200).json({
          success: true,
          message: 'Login successful',
          token: token, // Send the JWT token in the response
        });
    } 
    catch (error) 
    {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

