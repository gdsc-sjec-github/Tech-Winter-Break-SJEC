import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;
      
    try {
        const existingUser = await User.findOne({ email });
        
        // if the user exists
        if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create new user
        const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: role,
        });
    
        await newUser.save();
    
        // Return success message
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // LEARN HOW THIS JWT STUFF WORKS BEFORE HOSTING
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
        const token = jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
    
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { registerUser, loginUser }