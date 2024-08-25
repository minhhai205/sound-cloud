import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    avatar: String,
    status: String,
    slug: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema, "users");

export default User;