import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = Schema(
  {
    name: {
      type: String,
      requied: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 3,
      required: true,
    },
    blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog",required:true }],
  },
  { timestamps: true }
);

export const userModal = mongoose.model("User", userSchema);
