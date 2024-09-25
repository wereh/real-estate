import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Ensure all fields are present
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hash the password asynchronously
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user with hashed password
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    // Handle errors (e.g., duplicate user, database issues)
    console.error("Error creating user:", err);
    next(err); // This will pass the error to the custom error handler
  }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User not found"));
        }
        
        // Check if password matches
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, "Invalid credentials"));
        }

        // Generate and send JWT
        const token = jwt.sign({ userId: validUser._id }, process.env.JWT_SECRET);
        res.cookie('access_token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day expiration
        });

        // Remove password from the user object
        const { password: _, ...userWithoutPassword } = validUser._doc; // _doc used to access the raw document

        // Send the user data without password along with the token
        return res.status(200).json({
            user: userWithoutPassword,
            token: token
        });

    } catch (err) {
        console.error("Error signing in user:", err);
        next(err); // Pass the error to the custom error handler
    }
};
