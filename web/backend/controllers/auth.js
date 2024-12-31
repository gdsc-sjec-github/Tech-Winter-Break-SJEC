import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    console.log(req.body);
      
    try {
        const existingUser = await User.findOne({ email });
        
        // if the user exists
        if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
        }
    
        // Hash the password
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                // Create new user
                const newUser = new User({
                    username,
                    email,
                    password: hash,
                    role,
                    createdAt: Date.now()
                    });

                await newUser.save();
                res.status(201).json({ message: 'User registered successfully!' });
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        
        // if user does not exist
        if (!user) {
        return res.status(400).json({ message: 'User not found' });
        }
    
        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    
        // Generate JWT token
        const token = jwt.sign({ email: user.email, role: user.role }, process.env.SECRET_KEY);
        
        res.cookie('token', token, {
            httpOnly: true, 
            sameSite: 'strict'
        });
    
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

