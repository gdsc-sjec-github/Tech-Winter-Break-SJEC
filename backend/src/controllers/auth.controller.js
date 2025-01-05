import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check for password reuse
    const users = await User.find();
    for (const user of users) {
      const isReusedPassword = await bcrypt.compare(password, user.password);
      if (isReusedPassword) {
        return res.status(400).json({ 
          message: `This password is already being used by ${user.fullName}. Please choose a different password.` 
        });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check for reused passwords
    const users = await User.find();
    for (const otherUser of users) {
      if (otherUser._id.toString() !== user._id.toString()) {
        const isReusedPassword = await bcrypt.compare(password, otherUser.password);
        if (isReusedPassword) {
          return res.status(400).json({ 
            message: `This password is being used by ${otherUser.fullName}. Please avoid using the same password as other users.` 
          });
        }
      }
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body; // Base64 or image URL
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    // Upload to Cloudinary with transformations for resizing and compression
    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      transformation: [
        { width: 300, height: 300, crop: "fill", gravity: "face" }, // Resize to 300x300 pixels
        { quality: "auto:low" }, // Reduce quality for smaller file size
        { fetch_format: "auto" }, // Automatically optimize the format (e.g., WebP)
        { dpr: "auto" } // Adjust for optimal display resolution
      ],
      folder: "profile_pics", // Optional: Save in a specific folder
      overwrite: true, // Overwrite existing image if re-uploading
      resource_type: "image" // Specify the file type
    });

    // Update the user with the new profile picture URL
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateProfile:", error.message);

    // Handle specific Cloudinary errors
    if (error.http_code && error.http_code === 400) {
      return res.status(400).json({ message: "Invalid image format or file size too large" });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
