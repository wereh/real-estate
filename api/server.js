import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";

dotenv.config();

// Connect to MongoDB

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const app = express();

//listen on http://localhost:5000

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

app.use('/api/user', userRouter);
