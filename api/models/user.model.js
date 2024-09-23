import mongoose from "mongoose";

//create a user schema

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    }
  },
  {
    timestamps: true,
  }
);

//create a model using the schema

const User = mongoose.model("User", userSchema);

export default User;
