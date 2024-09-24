import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

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
